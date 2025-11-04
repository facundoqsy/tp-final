// tp final edi

const express = require("express");
const app = express();
app.use(express.json());

// recursos que voy a usar
let duenos = [];
let mascotas = [];
let turnos = [];
let tratamientos = [];
let autoId = 1;

// dueños 

// Registrar dueños
app.post("/duenos", (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: "Falta nombre del dueño" });
    }
    const dueno = { id: autoId++, nombre };
    duenos.push(dueno);
    res.json(dueno);
});

// ver dueños
app.get("/duenos", (req, res) => {
    res.json(duenos);
});

// mascotas

// Registrar mascota
app.post("/mascotas", (req, res) => {
    const { nombre, especie, duenoId } = req.body;
    const dueno = duenos.find(d => d.id === duenoId);

    // ver si existe dueño
    if (!dueno) return res.status(400).json({ error: "Dueño no encontrado" });
    
    if (!nombre || !especie) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const mascota = { id: autoId++, nombre, especie, duenoId };
    mascotas.push(mascota);
    res.json(mascota);
});

// Listar mascotas
app.get("/mascotas", (req, res) => {
    res.json(mascotas);
});

// turnos

// Agendar turno
app.post("/turnos", (req, res) => {
    const { mascotaId, fecha } = req.body;
    const mascota = mascotas.find(m => m.id === mascotaId);

    if (!mascota) return res.status(400).json({ error: "Mascota no encontrada" });

    const fechaTurno = new Date(fecha);
    const hoy = new Date();

    // control de fecha
    if (fechaTurno < hoy) {
        return res.status(400).json({ error: "No se puede poner turno en pasado" });
    }

    const turno = { id: autoId++, mascotaId, fecha };
    turnos.push(turno);
    res.json(turno);
});

// Listar turnos
app.get("/turnos", (req, res) => {
    res.json(turnos);
});

// tratamientos

// Registrar tratamiento
app.post("/tratamientos", (req, res) => {
    const { mascotaId, descripcion, fecha } = req.body;
    const mascota = mascotas.find(m => m.id === mascotaId);

    if (!mascota) return res.status(400).json({ error: "Mascota no encontrada" });

    const tratamiento = { id: autoId++, mascotaId, descripcion, fecha };
    tratamientos.push(tratamiento);
    res.json(tratamiento);
});

// Historial médico
app.get("/mascotas/:id/historial", (req, res) => {
    const id = Number(req.params.id);
    const mascota = mascotas.find(m => m.id === id);

    if (!mascota) return res.status(404).json({ error: "Mascota no existe" });

    const historial = tratamientos.filter(t => t.mascotaId === id);
    res.json({ mascota, historial });
});

// control de año

app.get("/mascotas/chequeo/pendiente", (req, res) => {
    const unAnoAtras = new Date();
    unAnoAtras.setFullYear(unAnoAtras.getFullYear() - 1);

    const mascotasPendientes = mascotas.filter(m => {
        const ultimo = tratamientos
            .filter(t => t.mascotaId === m.id)
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];

        return !ultimo || new Date(ultimo.fecha) < unAnoAtras;
    });

    res.json(mascotasPendientes);
});
app.get("/", (req, res) => {
    res.send("bienvenido");
});


// iniciar
app.listen(3000, () => {
    console.log("API veterinaria funcionando en http://localhost:3000");
});
