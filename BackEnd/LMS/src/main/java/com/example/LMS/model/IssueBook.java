package com.example.LMS.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
public class IssueBook {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer TID;
	
	LocalDate issueDate;
	LocalDate dueDate;
	Boolean isActive;
	LocalDateTime createTs;

    LocalDateTime modifiedTs;


    @ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "stdId")
	Student student;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "bookId")
	Book book;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "libId")
	Librarian librarian;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "issueBook", fetch = FetchType.LAZY)
	private ReturnBook returnBook;

	public Integer getTID() {
		return TID;
	}

	public void setTID(Integer tID) {
		TID = tID;
	}

	public LocalDate getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(LocalDate issueDate) {
		this.issueDate = issueDate;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
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

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Librarian getLibrarian() {
		return librarian;
	}

	public void setLibrarian(Librarian librarian) {
		this.librarian = librarian;
	}

	@Override
	public String toString() {
		return "IssueBook [TID=" + TID + ", issueDate=" + issueDate + ", dueDate=" + dueDate + ", isActive=" + isActive
				+ ", createTs=" + createTs + ", modifiedTs=" + modifiedTs + ", studId=" + student.getId() + ", bookId=" + book.getId()
				+ ", librarianId=" + librarian.getId() + "]";
	}

	
}
