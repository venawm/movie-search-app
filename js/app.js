import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { Firestore, 
    getDocs,
    getFirestore, 
    onSnapshot, 
    query, 
    collection, 
    orderBy,
    addDoc,
    doc,
    setDoc,
    updateDoc,
    deleteDoc } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js'

      
      // Your web app's Firebase configuration

      const firebaseConfig = {

        apiKey: "AIzaSyD_vwijUUniVhgjoqc-BRc0ABDvmnZELX4",
      
        authDomain: "first-cloud-storage-1f68f.firebaseapp.com",
      
        projectId: "first-cloud-storage-1f68f",
      
        storageBucket: "first-cloud-storage-1f68f.appspot.com",
      
        messagingSenderId: "527846782743",
      
        appId: "1:527846782743:web:f404d778758afb7694a952",
      
        measurementId: "G-20N7FNEZH2"
      
      };


      
   const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const movieList = document.getElementById("movieList");

const querySnapshot = await getDocs(collection(db, "movies"));

const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


movies.forEach(movie => {
  const movieEl = document.createElement("div");
  movieEl.classList.add("movie");

  const titleEl = document.createElement("h2");
  titleEl.innerText = movie.title;
  movieEl.appendChild(titleEl);

  const directorEl = document.createElement("p");
  directorEl.innerText = "Director: " + movie.director;
  movieEl.appendChild(directorEl);

  const yearEl = document.createElement("p");
  yearEl.innerText = "Year: " + movie.year;
  movieEl.appendChild(yearEl);

  const reviewsEl = document.createElement("div");
  reviewsEl.classList.add("reviews");

  Object.values(movie.reviews).forEach(review => {
    const reviewEl = document.createElement("div");
    reviewEl.classList.add("review");

    const reviewerEl = document.createElement("p");
    reviewerEl.innerText = "Reviewer: " + review.reviewer;
    reviewEl.appendChild(reviewerEl);

    const ratingEl = document.createElement("p");
    ratingEl.innerText = "Rating: " + review.rating;
    reviewEl.appendChild(ratingEl);

    const commentEl = document.createElement("p");
    commentEl.innerText = "Comment: " + review.comment;
    reviewEl.appendChild(commentEl);

    // Edit and Delete buttons for each review
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", () => {
      const newRating = prompt("Enter a new rating:");
      if (newRating) {
        const reviewIndex = movie.reviews.findIndex(
          r => r.reviewer === review.reviewer
        );
        movie.reviews[reviewIndex].rating = newRating;
        updateDoc(doc(db, "movies", movie.id), { reviews: movie.reviews });
      }
    });
    reviewEl.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      const reviewIndex = movie.reviews.findIndex(
        r => r.reviewer === review.reviewer
      );
      movie.reviews.splice(reviewIndex, 1);
      updateDoc(doc(db, "movies", movie.id), {reviews: movie.reviews });
    });
    reviewEl.appendChild(deleteBtn);
    reviewsEl.appendChild(reviewEl);
});

const addReviewBtn = document.createElement("button");
addReviewBtn.innerText = "Add Review";
addReviewBtn.addEventListener("click", () => {
const reviewer = prompt("Enter your name:");
const rating = prompt("Enter a rating:");
const comment = prompt("Enter a comment:");
if (reviewer && rating && comment) {
    const newReview = { reviewer, rating, comment };
    movie.reviews.push(newReview);
    updateDoc(doc(db, "movies", movie.id), { reviews: movie.reviews });
  }
});

reviewsEl.appendChild(addReviewBtn);
movieEl.appendChild(reviewsEl);

movieList.appendChild(movieEl);
});

// Create a listener for changes in the movies collection
onSnapshot(query(collection(db, "movies")), snapshot => {
const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// Loop through each movie and update the corresponding HTML element
movies.forEach(movie => {
const movieEl = document.getElementById(movie.id);
const titleEl = movieEl.querySelector("h2");
const directorEl = movieEl.querySelector(".director");
const yearEl = movieEl.querySelector(".year");
const reviewsEl = movieEl.querySelector(".reviews")
titleEl.innerText = movie.title;
directorEl.innerText = "Director: " + movie.director;
yearEl.innerText = "Year: " + movie.year;

// Clear existing reviews before adding updated ones
reviewsEl.innerHTML = "";

Object.values(movie.reviews).forEach(review => {
  const reviewEl = document.createElement("div");
  reviewEl.classList.add("review");

  const reviewerEl = document.createElement("p");
  reviewerEl.innerText = "Reviewer: " + review.reviewer;
  reviewEl.appendChild(reviewerEl);

  const ratingEl = document.createElement("p");
  ratingEl.innerText = "Rating: " + review.rating;
  reviewEl.appendChild(ratingEl);

  const commentEl = document.createElement("p");
  commentEl.innerText = "Comment: " + review.comment;
  reviewEl.appendChild(commentEl);
})

  // Edit and Delete buttons for each review
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", () => {
    const newRating = prompt("Enter a new rating:");
    if (newRating) {
      const reviewIndex = movie.reviews.findIndex(
        r => r.reviewer === review.reviewer
      );
      movie.reviews[reviewIndex].rating = newRating;
      updateDoc(doc(db, "movies", movie.id), { reviews: movie.reviews });
    }
  });
  reviewEl.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => {
    const reviewIndex = movie.reviews.findIndex(
      r => r.reviewer === review.reviewer
    );
    movie.reviews.splice(reviewIndex, 1);
    updateDoc(doc(db, "movies", movie.id), { reviews: movie.reviews });
  });
  reviewEl.appendChild(deleteBtn);

  reviewsEl.appendChild(reviewEl);
});

const addReviewBtn = document.createElement("button");
addReviewBtn.innerText = "Add Review";
addReviewBtn.addEventListener("click", () => {
  const reviewer = prompt("Enter your name:");
  const rating = prompt("Enter a rating:");
  const comment = prompt("Enter a comment:");

  if (reviewer && rating && comment) {
    const newReview = { reviewer, rating, comment };
    movie.reviews.push(newReview);
    updateDoc(doc(db, "movies", movie.id), { reviews: movie.reviews });
    }
    });
})




