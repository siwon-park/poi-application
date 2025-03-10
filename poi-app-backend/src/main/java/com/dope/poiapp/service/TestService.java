package com.dope.poiapp.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xwpf.usermodel.*;
import org.docx4j.Docx4J;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;

import java.io.*;
import java.util.List;

/*
* 나중에 사용하거나 테스트 할 때 사용했던 메서드만 모음
* */
public class TestService {

    public void readTest() throws FileNotFoundException, IOException {
        FileInputStream fis = new FileInputStream("C:\\Users\\SIWON\\Downloads\\WordTemplate.docx");
        XWPFDocument document = new XWPFDocument(fis);

        // 문서의 모든 단락을 가져옴 -> 단락만 읽음
        int p = 1;
        for (XWPFParagraph paragraph : document.getParagraphs()) {
            // 단락의 텍스트 출력
            System.out.println("paragraph: " + (p++));
            System.out.println(paragraph.getText());
        }

        int c = 1;
        for (XWPFTable table : document.getTables()) {
            for (XWPFTableRow row : table.getRows()) {
                for (XWPFTableCell cell : row.getTableCells()) {
                    System.out.println("cell Text " + (c++) + " " + cell.getText());
                }
            }
        }
    }
    // 테스트용
    public void readAndWrite() throws FileNotFoundException, IOException {
        FileInputStream fis = new FileInputStream("C:\\Users\\SIWON\\Downloads\\WordTemplate.docx");
        FileOutputStream fos = new FileOutputStream("C:\\Users\\SIWON\\Downloads\\개발완료확인서_수정.docx");
        XWPFDocument document = new XWPFDocument(fis);

        List<XWPFParagraph> paragraphs = document.getParagraphs();

        // run: 입력 내용?
        XWPFRun run;
        run = paragraphs.get(19).getRuns().get(0); // 19번째 패러그래프의 런 정보의 첫번째 값부터 가져옴; 날짜
        run.setText("2024년 10월 05일", 0);
        int runSize = paragraphs.get(19).getRuns().size();
        for (int i = runSize - 1; i > 0; i--) {
            paragraphs.get(19).removeRun(i);
        }
        document.write(fos);
        IOUtils.closeQuietly(fos);
        document.close();
    }

    public byte[] convertDocxToPdf1(byte[] docxBytes) throws Exception {
        WordprocessingMLPackage wordprocessingMLPackage = WordprocessingMLPackage.load(new ByteArrayInputStream(docxBytes));
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Docx4J.toPDF(wordprocessingMLPackage, out);
        return out.toByteArray();

    }

    public byte[] createAndConvertToPdf(long pid) throws IOException {
        // 1. DOCX 파일 생성
//        byte[] docxContent = createWord(pid);

        // 2. DOCX 내용을 읽어서 PDF로 변환
//        return convertDocxToPdf(docxContent);
        return new byte[1];
    }

    public byte[] convertDocxToPdf(byte[] docxContent) throws IOException {
        // DOCX 문서 로드
        XWPFDocument document = new XWPFDocument(new ByteArrayInputStream(docxContent));
        // PDF 문서 생성
        PDDocument pdfDocument = new PDDocument();
        try {
            PDType0Font font = PDType0Font.load(pdfDocument, new File("C:\\Windows\\Fonts\\gulim.ttc"));
            // DOCX의 각 단락을 PDF로 변환
            for (IBodyElement element : document.getBodyElements()) {
                if (element instanceof XWPFParagraph) {
                    XWPFParagraph paragraph = (XWPFParagraph) element;

                    // 새 페이지 생성
                    PDPage page = new PDPage(PDRectangle.A4);
                    pdfDocument.addPage(page);

                    // 컨텐츠 스트림 생성
                    try (PDPageContentStream contentStream = new PDPageContentStream(pdfDocument, page)) {
                        // 텍스트 시작 위치 설정
                        contentStream.beginText();
                        contentStream.setFont(font, 14);
                        contentStream.newLineAtOffset(50, 750); // 여백 설정

                        // 단락의 텍스트 추출 및 작성
                        String text = paragraph.getText();
                        contentStream.showText(text);

                        contentStream.endText();
                    }
                }
                // 필요한 경우 표(Table) 처리 로직 추가
            }

            // PDF를 바이트 배열로 변환
            ByteArrayOutputStream pdfOutput = new ByteArrayOutputStream();
            pdfDocument.save(pdfOutput);
            return pdfOutput.toByteArray();

        } finally {
            pdfDocument.close();
            document.close();
        }

    }
}
