module.exports = {
    
    getUptime: async (req, res, next) => {
        res.status(200).json({uptime: uptime});
    }
}