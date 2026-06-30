// ======================================
// Assessment Technician
// script.js (Bagian 1)
// ======================================

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);

// ==============================
// GANTI HALAMAN
// ==============================

function showPage(pageId){

    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

}

// ==============================
// IDENTITAS
// ==============================

function nextToInstruction(){

    const nama=document.getElementById("nama").value.trim();
    const nik=document.getElementById("nik").value.trim();
    const perusahaan=document.getElementById("perusahaan").value.trim();
    const jabatan=document.getElementById("jabatan").value.trim();

    if(nama=="" || nik=="" || perusahaan=="" || jabatan==""){

        alert("Semua identitas wajib diisi.");

        return;

    }

    showPage("page-petunjuk");

}

// ==============================
// MULAI UJIAN
// ==============================

function startExam(){

    showPage("page-soal");

    renderQuestion();

}

// ==============================
// MENAMPILKAN SOAL
// ==============================

function renderQuestion(){

    const q = questions[currentQuestion];

    const container=document.getElementById("questionContainer");

    let html="";

    html+=`
    <div class="question">

        <h3>${q.question}</h3>

    `;

    q.options.forEach((option,index)=>{

        html+=`

        <div class="option">

            <label>

                <input
                    type="radio"
                    name="question"
                    value="${index}"

                    ${answers[currentQuestion]==index ? "checked":""}

                    onchange="saveAnswer(${index})"

                >

                ${option}

            </label>

        </div>

        `;

    });

    html+=`

    </div>

    <p><strong>Soal ${currentQuestion+1} dari ${questions.length}</strong></p>

    `;

    container.innerHTML=html;

    updateProgress();

}

// ==============================
// SIMPAN JAWABAN
// ==============================

function saveAnswer(value){

    answers[currentQuestion]=value;

    updateProgress();

}

// ==============================
// NEXT
// ==============================

function nextQuestion(){

    if(answers[currentQuestion]==null){

        alert("Silakan pilih jawaban terlebih dahulu.");

        return;

    }

    if(currentQuestion<questions.length-1){

        currentQuestion++;

        renderQuestion();

    }

}

// ==============================
// BACK
// ==============================

function prevQuestion(){

    if(currentQuestion>0){

        currentQuestion--;

        renderQuestion();

    }

}

// ==============================
// UPDATE PROGRESS
// ==============================

function updateProgress(){

    let answered=0;

    answers.forEach(a=>{

        if(a!=null){

            answered++;

        }

    });

    let percent=(answered/questions.length)*100;

    document.getElementById("progressBar").style.width=percent+"%";

    document.getElementById("progressText").innerHTML=Math.round(percent)+"%";

}

// ======================================
// script.js (Bagian 2)
// ======================================

// ==============================
// SUBMIT ASSESSMENT
// ==============================

function submitExam(){

    // Cek semua soal sudah dijawab
    let belumDijawab = [];

    answers.forEach((item,index)=>{

        if(item===null){

            belumDijawab.push(index+1);

        }

    });

    if(belumDijawab.length>0){

        alert(
            "Masih ada soal yang belum dijawab.\n\nNomor : "
            + belumDijawab.join(", ")
        );

        return;

    }

    // Konfirmasi

    const yakin = confirm(
        "Apakah Anda yakin ingin mengumpulkan Assessment?"
    );

    if(!yakin){

        return;

    }

    hitungNilai();

}

// ==============================
// HITUNG NILAI
// ==============================

function hitungNilai(){

    let benar = 0;

    questions.forEach((q,index)=>{

        if(answers[index]===q.answer){

            benar++;

        }

    });

    const salah = questions.length - benar;

    const nilai = Math.round(
        (benar/questions.length)*100
    );

    tampilkanHasil(benar,salah,nilai);

}

// ==============================
// TAMPILKAN HASIL
// ==============================

function tampilkanHasil(benar,salah,nilai){

    showPage("page-result");

    document.getElementById("hasilNama").innerHTML =
        document.getElementById("nama").value;

    document.getElementById("hasilNilai").innerHTML =
        "<b>Nilai :</b> " + nilai;

    document.getElementById("hasilBenar").innerHTML =
        "<b>Jawaban Benar :</b> " + benar;

    document.getElementById("hasilSalah").innerHTML =
        "<b>Jawaban Salah :</b> " + salah;

    let status = "";

    if(nilai>=80){

        status="LULUS";

    }else{

        status="TIDAK LULUS";

    }

    document.getElementById("hasilStatus").innerHTML =
        "<b>Status :</b> " + status;

}

// ==============================
// KEYBOARD SHORTCUT
// ==============================

document.addEventListener("keydown",function(e){

    const pageSoal =
        document.getElementById("page-soal");

    if(!pageSoal.classList.contains("active")){

        return;

    }

    if(e.key==="ArrowRight"){

        nextQuestion();

    }

    if(e.key==="ArrowLeft"){

        prevQuestion();

    }

});

// ==============================
// CEGAH ENTER PADA FORM
// ==============================

document.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        e.preventDefault();

    }

});

// ==============================
// LOAD PERTAMA
// ==============================

showPage("page-identitas");

updateProgress();