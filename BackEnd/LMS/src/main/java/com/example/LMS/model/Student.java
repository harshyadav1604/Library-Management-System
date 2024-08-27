package com.example.LMS.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
public class Student {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	String SID;
	
	@Size(min = 2, message = "Name should be atleast 2 character")
	String name;
	
	String username;
	
	String password;
	String moblieNo;
	String emailId;
	String branch;
	Integer batchYear;
	Boolean isActive;
	LocalDateTime createTs;

    LocalDateTime modifiedTs;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "student", cascade = CascadeType.ALL)
    private List<IssueBook> issueBookList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSID() {
		return SID;
	}

	public void setSID(String sID) {
		SID = sID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMoblieNo() {
		return moblieNo;
	}

	public void setMoblieNo(String moblieNo) {
		this.moblieNo = moblieNo;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public Integer getBatchYear() {
		return batchYear;
	}

	public void setBatchYear(Integer batchYear) {
		this.batchYear = batchYear;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public LocalDateTime getCreateTs() {
		return createTs;
	}

	public void setCreateTs(LocalDateTime createTs) {
		this.createTs = createTs;
	}

	public LocalDateTime getModifiedTs() {
		return modifiedTs;
	}

	public void setModifiedTs(LocalDateTime modifiedTs) {
		this.modifiedTs = modifiedTs;
	}

	@Override
	public String toString() {
		return "Student [id=" + id + ", SID=" + SID + ", name=" + name + ", username=" + username + ", password="
				+ password + ", moblieNo=" + moblieNo + ", emailId=" + emailId + ", branch=" + branch + ", batchYear="
				+ batchYear + ", isActive=" + isActive + ", createTs=" + createTs + ", modifiedTs=" + modifiedTs + "]";
	}

	
	
}
