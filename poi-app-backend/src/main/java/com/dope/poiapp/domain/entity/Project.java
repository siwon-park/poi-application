package com.dope.poiapp.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
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

    // TODO: 복합 프로젝트(프로젝트 이름, 프로젝트명이 여러 개인 경우?)
    private String name; // 프로젝트 이름

    private String description; // 프로젝트 내용

    private String projectManager; // PM

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    private String customer; // 고객 담당자

    private LocalDateTime startDate; // 프로젝트 시작일

    private LocalDateTime endDate; // 종료일

    // TODO: 프로젝트의 공수 추가 필요 (Double)

    private boolean hasOutSourcing; // 하도급 유무

    @CreatedDate
    private LocalDateTime createdAt; // 생성일

    @LastModifiedDate
    private LocalDateTime updatedAt; // 업데이트 일

    public void updateName(String name) {
        this.name = name;
    }

    public void updateDescription(String description) {
        this.description = description;
    }

    public void updateProjectManager(String projectManager) {
        this.projectManager = projectManager;
    }

    public void updateCompany(Company company) {
        this.company = company;
    }

    public void updateCustomer(String customer) {
        this.customer = customer;
    }

    public void updateStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public void updateEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public void updateHasOutSourcing(boolean hasOutSourcing) {
        this.hasOutSourcing = hasOutSourcing;
    }

}
