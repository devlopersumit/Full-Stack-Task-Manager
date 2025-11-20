const userAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Basic')) {
        return res.status(401).json({
            message:'Unauthorized access. Please provide valid credentials.'
        });
    }

    try{
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');

        if(username === process.env.AUTH_USER && password === process.env.AUTH_PASS) {
            next();
        } else {
            return res.status(401).json({
                message:'Unauthorized access. Please provide valid credentials.'
            });
        }
    }catch(err) {
        console.error('Auth error:', err);
        res.status(500).json({ message: err.message || 'Something went wrong' });
    }
};

module.exports = userAuth;