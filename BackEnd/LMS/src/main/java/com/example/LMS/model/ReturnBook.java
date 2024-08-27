package com.example.LMS.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
public class ReturnBook {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer TID;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "issueId")
	IssueBook issueBook;
	
	LocalDate returnDate;
	
	Double lateFeeAmount;
	
	Integer libararianId;

	LocalDateTime createTs;

    LocalDateTime modifiedTs;

	public Integer getTID() {
		return TID;
	}

	public void setTID(Integer tID) {
		TID = tID;
	}

	public IssueBook getIssueBook() {
		return issueBook;
	}

	public void setIssueBook(IssueBook issueBook) {
		this.issueBook = issueBook;
	}

	public LocalDate getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}

	public Double getLateFeeAmount() {
		return lateFeeAmount;
	}

	public void setLateFeeAmount(Double lateFeeAmount) {
		this.lateFeeAmount = lateFeeAmount;
	}

	public Integer getLibararianId() {
		return libararianId;
	}

	public void setLibararianId(Integer libararianId) {
		this.libararianId = libararianId;
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
		return "ReturnBook [TID=" + TID + ", issueBook=" + issueBook + ", returnDate=" + returnDate + ", lateFeeAmount="
				+ lateFeeAmount + ", libararianId=" + libararianId + ", createTs=" + createTs + ", modifiedTs="
				+ modifiedTs + "]";
	}

	
    
}
