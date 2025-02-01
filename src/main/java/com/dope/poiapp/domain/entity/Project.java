package com.dope.poiapp.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name; // 프로젝트 이름

    private String description; // 프로젝트 내용

    private String projectManager; // PM

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    private String customer; // 고객 담당자

    private Date startDate; // 프로젝트 시작일

    private Date endDate; // 종료일
}
