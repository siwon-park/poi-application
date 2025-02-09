package com.dope.poiapp.controller;

import com.dope.poiapp.service.PoiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class PoiController {

    private final PoiService poiService;

    // TO-DO: ResponseBody로 수정하여 결과에 따른 리턴 코드 분기화 필요
    // 200: 성공, 401: Unauthorized (인증 정보 없음), 403: Forbidden (권한 없음), 404: Not Found
    @GetMapping("/download/word/{pid}")
    public ResponseEntity<byte[]> downloadWord(@PathVariable long pid) throws Exception {
        byte[] wordContent = poiService.createWord(pid);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "sample.docx");
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        return ResponseEntity.ok()
                .headers(headers)
                .body(wordContent);
    }

    /*
    * pdf 컨버팅은 구현 방법이랑 라이브러리를 더 찾아보고 결정
    * */
    /*
    @GetMapping("/download/pdf/{pid}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable long pid) throws Exception {
//        byte[] wordContent = poiService.createWord(pid);
//        byte[] pdfContent = poiService.convertDocxToPdf(wordContent);
        byte[] pdfContent = poiService.createAndConvertToPdf(pid);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "sample.pdf");
        headers.setContentType(MediaType.APPLICATION_PDF);
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfContent);
    }
    */

}
