let temporaryStorage = [];
let copiedStorage = [];

// تحميل الملفات وتخزينها مؤقتاً
document.getElementById('storeBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            temporaryStorage.push(files[i]);
        }
        updateStoredFiles();
        fileInput.value = ''; // إعادة تعيين حقل رفع الملفات
    } else {
        alert("يرجى اختيار الملفات لتخزينها.");
    }
});

// نسخ الملفات إلى سجل الملفات المنسوخة
document.getElementById('copyBtn').addEventListener('click', () => {
    copiedStorage = [...copiedStorage, ...temporaryStorage];
    updateCopiedFiles();
});

// تحميل الملفات المنسوخة
document.getElementById('downloadBtn').addEventListener('click', () => {
    copiedStorage.forEach(file => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});

// مسح الملفات
document.getElementById('clearBtn').addEventListener('click', () => {
    temporaryStorage = [];
    copiedStorage = [];
    updateStoredFiles();
    updateCopiedFiles();
});

// تحديث قائمة الملفات المخزنة
function updateStoredFiles() {
    const storedFilesDiv = document.getElementById('storedFiles');
    storedFilesDiv.innerHTML = '';
    
    if (temporaryStorage.length > 0) {
        temporaryStorage.forEach((file, index) => {
            storedFilesDiv.innerHTML += `<p><strong>ملف ${index + 1}:</strong> ${file.name}</p>`;
        });
    } else {
        storedFilesDiv.innerHTML = '<p>لا توجد ملفات مخزنة.</p>';
    }
}

// تحديث قائمة الملفات المنسوخة
function updateCopiedFiles() {
    const copiedFilesDiv = document.getElementById('copiedFiles');
    copiedFilesDiv.innerHTML = '';
    
    if (copiedStorage.length > 0) {
        copiedStorage.forEach((file, index) => {
            copiedFilesDiv.innerHTML += `<p><strong>ملف ${index + 1}:</strong> ${file.name}</p>`;
        });
    } else {
        copiedFilesDiv.innerHTML = '<p>لا توجد ملفات منسوخة.</p>';
    }
}
