package com.dope.poiapp.controller;

import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
public class TestController {

    @GetMapping("/download/excel")
    public ResponseEntity<byte[]> downloadExcel() throws IOException {
        // Create a new workbook and sheet
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sample Sheet");

        // Create a row and put some cells in it
        Row row = sheet.createRow(0);
        row.createCell(0).setCellValue("Name");
        row.createCell(1).setCellValue("Age");

        // Sample data
        Row dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("John Doe");
        dataRow.createCell(1).setCellValue(30);

        // Write the output to a byte array
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        // Prepare response
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "sample.xlsx");
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        return ResponseEntity.ok()
                .headers(headers)
                .body(out.toByteArray());
    }

    @GetMapping("/download/pdf")
    public ResponseEntity<byte[]> downloadPdf() throws IOException {
        // Create a new PDF document
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        // Create a content stream to write text
        PDPageContentStream contentStream = new PDPageContentStream(document, page);
        contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA), 14);
        contentStream.beginText();
        contentStream.setLeading(14.5f);
        contentStream.newLineAtOffset(25, 700);
        contentStream.showText("Name: John Doe");
        contentStream.newLine();
        contentStream.showText("Age: 30");
        contentStream.endText();
        contentStream.close();

        // Write the output to a byte array
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        document.save(out);
        document.close();

        // Prepare response
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "sample.pdf");
        headers.setContentType(MediaType.APPLICATION_PDF);

        return ResponseEntity.ok()
                .headers(headers)
                .body(out.toByteArray());
    }
}