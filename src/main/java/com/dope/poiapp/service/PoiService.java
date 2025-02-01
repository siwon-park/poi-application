package com.dope.poiapp.service;

import com.dope.poiapp.domain.entity.Project;
import com.dope.poiapp.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.util.IOUtils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.apache.poi.xwpf.usermodel.*;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PoiService {

    @Value("${file.template.path}")
    private String templateFilePath;

    private final ProjectRepository projectRepository;

    /**
     * TODO: project나 company 객체를 사용하지 말고 DTO 사용으로 변경 필요 (25-02-01)
     * */
    public byte[] createWord(long pid) throws FileNotFoundException, IOException {
        FileInputStream fis = new FileInputStream(templateFilePath); // "C:\\Users\\zow77\\Downloads\\WordTemplate.docx"
        XWPFDocument document = new XWPFDocument(fis);
        List<XWPFParagraph> paragraphs = document.getParagraphs(); // 문서 패러그래프의 정보
        Project project = projectRepository.findById(pid).orElseThrow();
        String company = project.getCompany().getName();
        Date finishDate = project.getEndDate();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일");
        String finDate = sdf.format(finishDate);

        SimpleDateFormat sdf2 = new SimpleDateFormat("yyMMdd");
        String newFileName = "개발완료확인서_" + company + "_" + sdf2.format(finishDate) + ".docx";

        XWPFRun run;
        run = paragraphs.get(19).getRuns().get(0); // 19번째 패러그래프의 런 정보의 첫번째 값부터 가져옴; 날짜
        run.setText(finDate, 0);
        int runSize = paragraphs.get(19).getRuns().size();
        for (int i = runSize - 1; i > 0; i--) {
            paragraphs.get(19).removeRun(i);
        }

        run = paragraphs.get(21).getRuns().get(0);
        run.setText("㈜" + company + " 귀중", 0);
        runSize = paragraphs.get(21).getRuns().size();
        for (int i = runSize - 1; i > 0; i--) {
            paragraphs.get(21).removeRun(i);
        }

        /*
        * 셀 안에 패러그래프가 있고, 해당 패러그래프 안에 run 객체들이 있는 구조
        * 따라서 조작을 하려면 이를 잘 파악해야 함
        * */
        int cellNo = 0;
        for (XWPFTable table : document.getTables()) {
            for (XWPFTableRow row : table.getRows()) {
                for (XWPFTableCell cell : row.getTableCells()) {
                    if (cellNo == 0) { // 첫 장 회사명
                        XWPFRun cellRun = cell.getParagraphs().get(1).getRuns().get(0);
                        cellRun.setText("㈜" + company, 0);
                        runSize = cell.getParagraphs().get(1).getRuns().size();
                        for (int i = runSize - 1; i > 0; i--) {
                            cell.getParagraphs().get(1).removeRun(i);
                        }
                    }
                    if (cellNo == 3) { // 프로젝트 명
                        cell.setText(project.getName());
                        cell.getParagraphs().get(0).getRuns().get(0).setFontFamily("맑은 고딕");
                    }
                    if (cellNo == 5) { // 고객 담당자
                        cell.setText(project.getCustomer());
                        cell.getParagraphs().get(0).getRuns().get(0).setFontFamily("맑은 고딕");
                    }
                    if (cellNo == 7) { // 개발 기간
                        cell.setText(sdf.format(project.getStartDate()) + " ~ " + sdf.format(project.getEndDate()));
                        cell.getParagraphs().get(0).getRuns().get(0).setFontFamily("맑은 고딕");
                    }
                    if (cellNo == 9) { // 개발 완료 확인 일자
                        cell.setText(sdf.format(project.getEndDate()));
                        cell.getParagraphs().get(0).getRuns().get(0).setFontFamily("맑은 고딕");
                    }
                    if (cellNo == 14) { // 개발 내역
                        XWPFRun cellRun = cell.getParagraphs().get(0).createRun();
                        String[] lines = project.getDescription().split("\\r?\\n"); // \r(윈도우 개행)이나 \n(일반개행)으로 파싱
                        cellRun.setText(lines[0]);
                        for (int i = 1; i < lines.length; i++) {
                            cellRun.addBreak(); // word상에서 shift + enter의 기능
                            cellRun.setText(lines[i]);
                        }
                        cell.getParagraphs().get(0).getRuns().get(0).setFontFamily("맑은 고딕");
                    }
                    if (cellNo == 18) { // 요청자
                        XWPFRun cellRun = cell.getParagraphs().get(0).createRun();
                        cellRun.setText("회사명 : ㈜다우기술");
                        cell.getParagraphs().get(0).getRuns().get(0).setFontFamily("맑은 고딕");
                        cell.addParagraph().createRun().setText("주  소 : 경기도 성남시 금토로69, 4층");
                        cell.getParagraphs().get(1).getRuns().get(0).setFontFamily("맑은 고딕");
                        cell.addParagraph().createRun().setText("담당자 : " + project.getProjectManager());
                        cell.getParagraphs().get(2).getRuns().get(0).setFontFamily("맑은 고딕");
                    }
                    if (cellNo == 19) { // 확인자
                        XWPFRun cellRun = cell.getParagraphs().get(0).createRun();
                        cellRun.setText("고객사 : ㈜" + project.getCompany().getName());
                        cell.getParagraphs().get(0).getRuns().get(0).setFontFamily("맑은 고딕");
                        cell.addParagraph().createRun().setText("주  소 : " + project.getCompany().getAddress());
                        cell.getParagraphs().get(1).getRuns().get(0).setFontFamily("맑은 고딕");
                        cell.addParagraph().createRun().setText("고객담당자 :    " + project.getCustomer() + "   (서명)");
                        cell.getParagraphs().get(2).getRuns().get(0).setFontFamily("맑은 고딕");
                    }
                    cellNo += 1;
                }
            }
        }

//        FileOutputStream fos = new FileOutputStream("C:\\Users\\zow77\\Downloads\\" + newFileName);
        ByteArrayOutputStream fos = new ByteArrayOutputStream();
        document.write(fos); // XWPFDocument 객체(document)의 내용을 fos에 바이트 스트림으로 저장함
        IOUtils.closeQuietly(fos);
        document.close();
        return fos.toByteArray();
    }
}
