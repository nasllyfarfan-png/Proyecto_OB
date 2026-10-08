import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import userModel from "../models/user.model.js";


export const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.user_password, salt);

    const newUser = await userModel.create({
      user_user: req.body.user_user,
      user_password: passwordHash,
      userStatus_fk: req.body.userStatus_fk,
      role_fk: req.body.role_fk
    });

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "User created successfully :)",
      data: newUser
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const showUser = async (req, res) => {
    try {
        const users = await userModel.findAll();
        return res.status(200).json({
            ok: true,
            status: 200,
            message: "Show Users :)",
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Something went wrong in the request",
            error: error.message
        });
    }
};

export const showUserId = async (req, res) => {
    try {
        const idUser = req.params.id;
        const user = await userModel.findOne({
            where: { id_usuario: idUser }
        });
        if (!user) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "User not found"
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            message: "Show User Id :)",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Something went wrong in the request",
            error: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const idUser = req.params.id;
        const dataUser = req.body;
        const passwordHash = await bcrypt.hash(dataUser.user_password, 10);
        const user = await userModel.findOne({
            where: { user_id: idUser }
        });
        if (!user) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "User not found"
            });
        }
        await user.update({
            user_user: dataUser.user_user,
            user_password: passwordHash,
            userStatus_fk: dataUser.userStatus_fk,
            role_fk: dataUser.role_fk
        });
        return res.status(200).json({
            ok: true,
            status: 200,
            message: "User updated successfully :)",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Something went wrong in the request",
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const idUser = req.params.id;
        const user = await userModel.findOne({
            where: { user_id: idUser }
        });
        if (!user) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "User not found"
            });
        }
        await user.destroy();
        return res.status(200).json({
            ok: true,
            status: 200,
            message: "User deleted successfully :)"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Something went wrong in the request",
            error: error.message
        });
    }
};

export const createUserfk = async (req, res) => {
    try {
        const createUsers = await userModel.create({
            user_user: faker.internet.email(),
            user_password: faker.internet.password(),
            userStatus_fk: 1,
            role_fk: 1
        });
        return res.status(200).json({
            ok: true,
            status: 200,
            message: "Create Fake User :)",
            id: createUsers.user_id
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Something went wrong in the request",
            error: error.message
        });
    }
};

// ---- LOGIN: crea el token y lo manda como cookie httpOnly ----
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Missing required fields: email and password"
            });
        }
        const user = await userModel.findOne({
            where: { user_user: email }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.user_password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.user_id, email: user.user_user },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,   // poner true cuando uses HTTPS en producción
            sameSite: "lax",
            maxAge: 3600000  // 1 hora, debe coincidir con expiresIn del JWT
        });

        return res.status(200).json({
            id: user.user_id,
            message: "Login correcto"
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Something went wrong in the request",
            error: error.message
        });
    }
};

// ---- LOGOUT: borra la cookie del token ----
export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    return res.status(200).json({
        ok: true,
        status: 200,
        message: "Sesión cerrada correctamente"
    });
};

const UserController = {
    createUser,
    showUser,
    showUserId,
    updateUser,
    deleteUser,
    createUserfk,
    loginUser,
    logoutUser
};

export default UserController;