// controllers/pdfController.j
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.generatePDF = async (req, res) => {
  try {
    const imageDataUrl = req.body.imageDataUrl;

    const buffer = Buffer.from(imageDataUrl.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const filePath = "../Image/output.jpg";
    fs.writeFileSync(filePath, buffer);

    const doc = new PDFDocument();

    const stream = doc.pipe(fs.createWriteStream("report.pdf"));

    doc.image(filePath,{
      align: "center",
      valign: "center",
    });

    doc.end();

    stream.on("finish", () => {
      res.download("report.pdf");
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
