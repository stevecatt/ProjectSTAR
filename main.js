let database = firebase.database()
let myUserId = ''
let users = []
let savedArticles = []
let comments = []
let signInUser = document.getElementById('signInUser')
let signUpUser = document.getElementById('signUpUser')
let signOut = document.getElementById('signOut')

database.ref("articles")
.on("child_added",function(snapshot){
  let article = new Article(snapshot.key,snapshot.val().user,snapshot.val().article)
  savedArticles.push(article)
})

database.ref("articles")
.on("child_removed",function(snapshot){
    savedArticles = savedArticles.filter((article) => {
      return article.key != snapshot.key
    })
})

database.ref("comments")
.on("child_added",function(snapshot){
  let comment = new Comment(snapshot.key,snapshot.val().user,snapshot.val().article,snapshot.val().comment)
  comments.push(comment)
})

database.ref("comments")
.on("child_removed",function(snapshot){
    comments = comments.filter((comment) => {
      return comment.key != snapshot.key
    })
})

signInUser.addEventListener('click',function() {
  let emailAddress = document.getElementById('emailAddress').value
  let password = document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(emailAddress,password)
  getUID()
})

signUpUser.addEventListener('click',function() {
  let emailAddress = document.getElementById('emailAddress').value
  let password = document.getElementById('password').value
  userName(emailAddress,password)
  firebase.auth().createUserWithEmailAndPassword(emailAddress,password)
})

signOut.addEventListener('click',function(){
  firebase.auth().signOut().then(function() {
    location.reload().then(function(){}).catch(function(error) {
  });
})
})

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
      console.log(error);
    })

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    });

firebase.auth().onAuthStateChanged(function(user) {
    window.user = user;
    });

function getUID() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
        myUserId = user.uid;
        return myUserId
        } else {
        }}

function userName(emailAddress,password) {
    let usersRef = database.ref("users")
    let userRef = usersRef.push({
      name: emailAddress,
      password: password
      })
  }

function saveArticle (articleTitle, articleURL) {
  let user = getUID()
  let articlesRef = database.ref("articles")
  let articleRef = articlesRef.push({
    user: user,
    title: articleTitle,
    url: articleURL
  })
}

function getSavedArticles () {
    document.getElementById("articlesUL").style.display = "block";
    let articlesLI = savedArticles.map((article) => {
      if (article.user == getUID()) {
        return `<li>
            <a src ='${article.url}'>${article.title}></a>
            <button onclick="deleteArticle('${article.key}')">Delete</button>
            </li>`
      } else {
      }
    })
    articlesUL.innerHTML = articlesLI.join("")
  }

function deleteArticle(articleKey) {
  database.ref("articles").child(articleKey).remove()
}

function submitComment (blog, comment) {
  let user = getUID()
  let commentsRef = database("comments")
  let commentRef = commentsRef.push({
    user: user,
    blog: blog,
    comment: comment
  })
  let articlesLI = savedArticles.map((article) => {
    if (article.user == getUID()) {
      return `<li>
          <a src ='${article.url}'>${article.title}></a>
          <button onclick="deleteArticle('${article.key}')">Delete</button>
          </li>`
    } else {
    }
  })
  articlesUL.innerHTML = articlesLI.join("")
}
