<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
  import { getStorage, ref, uploadBytes, getDownloadURL } from
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

  const firebaseConfig = {
    apiKey: "AIzaSyA9vU3pzzyqJ2dcIfRchzUldgBbaKct08c",
    authDomain: "floraskin-syorei-system.firebaseapp.com",
    projectId: "floraskin-syorei-system",
    storageBucket: "floraskin-syorei-system.appspot.com",
    messagingSenderId: "990675543914",
    appId: "1:990675543914:web:e2f1aa1ed5d7895044a713"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  window.uploadImageToFirebase = async function(file, path) {
      try {
          const storageRef = ref(storage, `images/${path}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return downloadURL;
      } catch (error) {
          console.error('写真アップロードエラー:', error);
          throw error;
      }
  };

  window.compressImage = function(file, maxWidth = 1000, quality = 0.8) {
      return new Promise((resolve) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();

          img.onload = function() {
              const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
              const newWidth = img.width * ratio;
              const newHeight = img.height * ratio;

              canvas.width = newWidth;
              canvas.height = newHeight;

              ctx.drawImage(img, 0, 0, newWidth, newHeight);
              canvas.toBlob(resolve, 'image/jpeg', quality);
          };

          img.src = URL.createObjectURL(file);
      });
  };

  console.log('Firebase設定完了');
  </script>
