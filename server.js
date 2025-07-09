import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  return res
    .status(200)
    .json({ message: "Email received successfully", email });
});

app.post("/application", (req, res) => {
  try {
    const {
      amount,
      term,
      firstName,
      lastName,
      middleName,
      email,
      birthDate,
      passportSeries,
      passportNumber,
    } = req.body;

    // Валидация обязательных полей
    if (!firstName || !lastName || !email || !passportNumber) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    console.log("Received application:", {
      amount,
      term,
      firstName,
      lastName,
      middleName,
      email,
      birthDate,
      passportSeries,
      passportNumber,
    });

    // Явный ответ с правильными заголовками
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error processing application:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
