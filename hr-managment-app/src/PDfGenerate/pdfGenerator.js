import { PDFDocument, rgb, StandardFonts, PageSizes} from 'pdf-lib';

export async function createpdf(pngImageBytes, searchName, startDate, endDate){
    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pngDims = pngImage.scale(0.4)
    const page = pdfDoc.addPage(PageSizes.A4);
    const { width, height } = page.getSize()

    const titleText = 'Attendance Report';
    const titleWidth = helveticaFont.widthOfTextAtSize(titleText, 20);

    page.drawText(titleText, {
        x: (width - titleWidth) / 2 -25,
        y: height - 30,
        size: 25,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });

    const description = searchName ? `Employee name: ${searchName}`: `Date: ${startDate} to ${endDate}`;

    page.drawText(description, {
      x: 10,
      y: height - 100,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
  });

    page.drawImage(pngImage, {
      x: page.getWidth() / 2 - pngDims.width/ 2 + 8,
      y: page.getHeight() / 2 - pngDims.height/2 + 100,
      width: pngDims.width,
      height: pngDims.height,
    });

    const generatedDate = new Date().toLocaleDateString();
    const generatedDateWidth = helveticaFont.widthOfTextAtSize(generatedDate, 12);

    page.drawText(generatedDate, {
        x: width - generatedDateWidth - 10, // Adjust for margin
        y: 10, // Adjust for margin
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });

    const signatureText = "My HR";
    const signatureTextWidth = helveticaFont.widthOfTextAtSize(signatureText, 12);

    page.drawText(signatureText, {
        x: width - signatureTextWidth - 10, // Adjust for margin
        y: 30, // Adjust for margin
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0)
    });

    const pdfBytes = await pdfDoc.save();
    const fileName = `Attendance_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
        // window.open(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  }