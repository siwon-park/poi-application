package com.dope.poiapp.repository;

import com.dope.poiapp.domain.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByProjectManager(String pmName);

    List<Project> findByCompanyName(String companyName);

    List<Project> findByStartDateGreaterThanEqualAndEndDateLessThanEqual(Date startDate, Date endDate);

    @NonNull
    Page<Project> findAll(@NonNull Pageable pageable);

    Page<Project> findAllByCompanyName(String companyName, Pageable pageable);
}
