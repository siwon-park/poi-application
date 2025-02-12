package com.dope.poiapp.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String address;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "company_alias_names", joinColumns = @JoinColumn(name="entity_id"))
    private List<String> aliasNames; // 'Basic' attribute type should not be a container -> JPA에서는 기본형밖에 지원 안하기 때문에 콜렉션을 쓰려면 어노테이션들이 필요

    @OneToMany
    private List<Project> projects;

    private boolean isActive;

    @CreatedDate
    private LocalDateTime createdAt; // 생성일

    @LastModifiedDate
    private LocalDateTime updatedAt; // 업데이트 일

    public void updateName(String name) {
        this.name = name;
    }

    public void updateAddress(String address) {
        this.address = address;
    }

    public void updateActive(boolean flag) {
        this.isActive = flag;
    }
}
