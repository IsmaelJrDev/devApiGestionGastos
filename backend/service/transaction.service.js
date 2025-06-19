const TransactionModel = require("../models/Transaction.model");

exports.getByFilters = async (userId, filters) => {
    let query = { user: userId };

    if (filters.searchText) {
        const searchRegex = new RegExp(filters.searchText, "i"); // Case-insensitive regex

        // Try to parse the searchText as a date
        const parsedDate = new Date(filters.searchText);
        const isDate = !isNaN(parsedDate.getTime());

        // Build an $or query to search across multiple fields
        query.$or = [
            { description: searchRegex }, // Search by description
            { type: searchRegex }, // Search by type (Ingreso/Egreso)
        ];

        if (isDate) {
            const startDate = new Date(
                parsedDate.getFullYear(),
                parsedDate.getMonth(),
                parsedDate.getDate(),
                0,
                0,
                0
            );
            const endDate = new Date(
                parsedDate.getFullYear(),
                parsedDate.getMonth(),
                parsedDate.getDate(),
                23,
                59,
                59,
                999
            );
            query.$or.push({ date: { $gte: startDate, $lte: endDate } });
        }

        // To search by category name, we need to populate categories first
        const categories = await TransactionModel.distinct("category", {
            user: userId,
        });
        const categoryIdsToSearch = [];

        for (const catId of categories) {
            const category = await TransactionModel.populate(
                {
                    path: "category",
                    match: { name: searchRegex },
                },
                {
                    _id: catId,
                }
            );
            if (category && category.category) {
                categoryIdsToSearch.push(category.category._id);
            }
        }

        if (categoryIdsToSearch.length > 0) {
            query.$or.push({ category: { $in: categoryIdsToSearch } });
        }
    }

    // If other specific filters (like type or date) are still passed, they will be applied
    // independently or combined with the searchText if they are not part of $or.
    // Given the single input request, we are primarily focusing on searchText.
    if (filters.type && !filters.searchText) {
        // Only apply if searchText is not present to avoid redundancy
        query.type = filters.type;
    }

    if (filters.date && !filters.searchText) {
        // Only apply if searchText is not present
        const startDate = new Date(`${filters.date}T00:00:00`);
        const endDate = new Date(`${filters.date}T23:59:59.999`);
        query.date = { $gte: startDate, $lte: endDate };
    }

    return await TransactionModel.find(query)
        .populate("category")
        .sort({ date: -1 });
};

exports.create = async (data, userId) => {
    const transaction = new TransactionModel({
        ...data,
        user: userId,
    });
    const savedTransaction = await transaction.save(); // Saves the new transaction to the database
    return savedTransaction.populate("category"); // Populates the category field of the saved transaction
};

exports.getAll = async (userId) => {
    return await TransactionModel.find({ user: userId })
        .populate("category")
        .sort({ date: -1 });
};

exports.getRecent = async (userId) => {
    return await TransactionModel.find({ user: userId })
        .populate("category")
        .sort({ date: -1 })
        .limit(6);
};

exports.deleteTransaction = async (transactionId, userId) => {
    return await TransactionModel.findOneAndDelete({
        _id: transactionId,
        user: userId,
    });
};
