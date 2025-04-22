console.log("🧭 Rutas de /api/cards cargadas");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("✅ GET /api/cards activa");
  res.send("🪄 /api/cards está vivo");
});

router.get("/daily", (req, res, next) => {
  console.log("📥 Petición recibida en /daily");
  next();
}, getCardOfTheDay);
