import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// ROUTERS
import userRouter from "../routers/user.router.js";
import userStatusRouter from "../routers/userStatus.router.js";
import roleRouter from "../routers/role.router.js";
import productRouter from "../routers/product.router.js";
import categoryRouter from "../routers/category.router.js";
import commentRouter from "../routers/comment.router.js";
import pqrsRouter from "../routers/pqrs.router.js";
import ventasRouter from "../routers/ventas.router.js";
import metodoPagoRouter from "../routers/metodo_pago.router.js";
import metodoenvioRouter from "../routers/metodo_envio.router.js";
import detalleVentasRouter from "../routers/detalle_ventas.router.js";
import carritoRouter from "../routers/carrito.router.js";
import carritoitemsRouter from "../routers/carrito_items.router.js";
import notificacionesRouter from "../routers/notificaciones.router.js";

const app = express();

// MIDDLEWARES GLOBALES
// OJO: ajusta "origin" al puerto real donde corre tu frontend (Vite lo muestra al arrancar, ej. http://localhost:5173)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

/* =========================
   ROUTES (VERSIÓN CORRECTA REST)
   ========================= */
app.use("/api/v1", userRouter);
app.use("/api/v1", userStatusRouter);
app.use("/api/v1", roleRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", commentRouter);
app.use("/api/v1", pqrsRouter);
app.use("/api/v1", ventasRouter);
app.use("/api/v1", metodoPagoRouter);
app.use("/api/v1", metodoenvioRouter);
app.use("/api/v1", detalleVentasRouter);
app.use("/api/v1", carritoRouter);
app.use("/api/v1/carrito_items", carritoitemsRouter);
app.use("/api/v1/notificaciones", notificacionesRouter);

app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});

export default app;