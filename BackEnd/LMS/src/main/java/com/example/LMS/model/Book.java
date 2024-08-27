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
public class Book {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	Integer id;
	
	
	@Size(min = 3, message = "Book name should have atleast 3 characters")
	String name;
	
	Integer Isbn;
	String author;
	String publisher;
	String genre;
	Integer edition;
	Boolean isActive;
	LocalDateTime createTs;

    LocalDateTime modifiedTs;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "book", cascade = CascadeType.ALL)
    private List<IssueBook> issueBookList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getIsbn() {
		return Isbn;
	}

	public void setIsbn(Integer isbn) {
		Isbn = isbn;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public Integer getEdition() {
		return edition;
	}

	public void setEdition(Integer edition) {
		this.edition = edition;
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
		return "Book [id=" + id + ", name=" + name + ", Isbn=" + Isbn + ", author=" + author + ", publisher="
				+ publisher + ", genre=" + genre + ", edition=" + edition + ", isActive=" + isActive + ", createTs="
				+ createTs + ", modifiedTs=" + modifiedTs + "]";
	}

	

	
}
