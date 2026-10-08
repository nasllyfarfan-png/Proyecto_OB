import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

    console.log("Authorization:", req.headers.authorization);
    
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                error: "Token not provided"
            });
        }

        token = token.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            error: "Invalid token"
        });
    }
};

export default verifyToken;