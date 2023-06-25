const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.single('pdf'));

// app.post('/upload', (req, res) => {
//   const pdfFile = req.file;

//   if (!pdfFile) {
//     return res.status(400).send('No PDF file uploaded.');
//   }

//   const pdfParser = new PDFParser();

//   pdfParser.on('pdfParser_dataError', (errData) => {
//     console.error(errData.parserError);
//     return res.status(500).send('Error occurred while processing PDF.');
//   });

//   pdfParser.on('pdfParser_dataReady', (pdfData) => {
//     const extractedText = pdfParser.getRawTextContent();
//     return res.send(extractedText);
//   });

//   fs.readFile(pdfFile.path, (err, pdfBuffer) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error occurred while reading the file.');
//     }

//     pdfParser.parseBuffer(pdfBuffer);
//   });
// });

// const fs = require('fs');
// const PDFParser = require('pdfreader').PDFParser;

// const pdfFilePath = 'file.pdf';

// fs.readFile(pdfFilePath, (err, pdfBuffer) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   const pdfParser = new PDFParser();

//   pdfParser.on('pdfParser_dataError', (errData) => {
//     console.error(errData.parserError);
//   });

//   pdfParser.on('pdfParser_dataReady', (pdfData) => {
//     const extractedText = pdfParser.getRawTextContent();
//     console.log(extractedText);
//   });

//   pdfParser.parseBuffer(pdfBuffer);
// });



const fs = require('fs');
const PDFParser = require('pdf-parse');

const pdfFilePath = 'file.pdf';

fs.readFile(pdfFilePath, async (err, pdfBuffer) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
    const pdfData = await PDFParser(pdfBuffer);
    const extractedText = pdfData.text;
    console.log(extractedText);
  } catch (error) {
    console.error(error);
  }
});



app.get('/', (req, res) => {
    const pdfFilePath = 'sample.pdf';
  
    fs.readFile(pdfFilePath, async (err, pdfBuffer) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error occurred while reading the file.');
      }
  
      try {
        const pdfData = await PDFParser(pdfBuffer);
        const extractedText = pdfData.text;
        res.send(extractedText);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while processing PDF.');
      }
    });
  });









const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
