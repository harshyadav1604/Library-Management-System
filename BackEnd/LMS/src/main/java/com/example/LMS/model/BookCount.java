package com.example.LMS.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
public class BookCount {

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
    Integer count;
	Boolean isActive;
	LocalDateTime createTs;

    LocalDateTime modifiedTs;

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

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
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
		return "BookCount [id=" + id + ", name=" + name + ", Isbn=" + Isbn + ", author=" + author + ", publisher="
				+ publisher + ", genre=" + genre + ", edition=" + edition + ", count=" + count + ", isActive="
				+ isActive + ", createTs=" + createTs + ", modifiedTs=" + modifiedTs + "]";
	}

	

	
}
