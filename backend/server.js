const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileName = req.body.fileName;
  const inputPath = `${file.path}.pgn`;
  const outputDir = path.join("output", fileName);
  const outputPath = path.join(outputDir, `${fileName}.pgn`);

  // Rename uploaded file to have .pgn extension
  fs.rename(file.path, inputPath, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err.message}`);
      return res.status(500).send(`Error renaming file: ${err.message}`);
    }

    // Create the new output directory
    fs.mkdir(outputDir, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err.message}`);
        return res.status(500).send(`Error creating directory: ${err.message}`);
      }

      // Copy pgn-extract.exe to the new folder
      const pgnExtractSourcePath = path.join("output", "pgn-extract.exe");
      const pgnExtractDestPath = path.join(outputDir, "pgn-extract.exe");
      fs.copyFile(pgnExtractSourcePath, pgnExtractDestPath, (err) => {
        if (err) {
          console.error(`Error copying pgn-extract.exe: ${err.message}`);
          return res
            .status(500)
            .send(`Error copying pgn-extract.exe: ${err.message}`);
        }

        const cmd = `${pgnExtractDestPath} ${inputPath} --splitvariants --output ${outputPath}`;

        console.log(`Executing command: ${cmd}`);
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing command: ${error.message}`);
            return res
              .status(500)
              .send(`Error executing command: ${error.message}`);
          }
          console.log(`Command output: ${stdout}`);
          console.log(`Command error (if any): ${stderr}`);
          res.send({
            message: "File extracted successfully",
            outputDir,
            output: stdout,
          });
        });
      });
    });
  });
});

app.post("/execute", (req, res) => {
  const { fileName } = req.body;
  const outputDir = path.join("output", fileName);
  const inputPath = path.join(outputDir, `${fileName}.pgn`);
  const outputPath = path.join(outputDir, `${fileName}-executed.pgn`);
  const cmd = `cd ${outputDir} && pgn-extract ${fileName}.pgn -#1 --output pgn#.pgn `;
  console.log(`File name: ${fileName}.pgn`);
  console.log(`Executing command: ${cmd}`);
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return res.status(500).send(`Error executing command: ${error.message}`);
    }
    console.log(`Command output: ${stdout}`);
    console.log(`Command error (if any): ${stderr}`);
    res.send({ message: "Command executed successfully", output: stdout });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
