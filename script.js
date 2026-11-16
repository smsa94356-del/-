// تشغيل الوظيفة عند تحميل الصفحة لضبط الحقل الافتراضي
window.onload = function() {
    updateQuestionInputType();
};

// دالة لتغيير شكل وطبيعة حقل إدخال السؤال حسب المادة المختارة
function updateQuestionInputType() {
    const subject = document.getElementById( subjectSelect ).value;
    const container = document.getElementById( dynamicInputContainer );
    
    let htmlContent =   ;

    if (subject ===  quran ) {
        htmlContent = `
            <label for="quranText">اكتب آية أو نص السؤال (حروف عربية):</label>
            <textarea id="quranText" rows="3" placeholder="اكتب الآية الكريمة أو السؤال الشرعي هنا..."></textarea>
        `;
    } 
    else if (subject ===  math ) {
        htmlContent = `
            <label for="mathText">اكتب المعادلة أو السؤال الرياضي (أحرف، جذور، كسور، سينات وصادات):</label>
            <div class="math-toolbar">
                <button type="button" class="math-btn" onclick="insertSymbol( س )">س</button>
                <button type="button" class="math-btn" onclick="insertSymbol( ص )">ص</button>
                <button type="button" class="math-btn" onclick="insertSymbol( √ )">√ (جذر)</button>
                <button type="button" class="math-btn" onclick="insertSymbol( / )">/ (كسر)</button>
                <button type="button" class="math-btn" onclick="insertSymbol( ^2 )">² (أس)</button>
                <button type="button" class="math-btn" onclick="insertSymbol( π )">ط (طا)</button>
            </div>
            <textarea id="mathText" rows="3" placeholder="مثال: أوجد مجموعة حل المعادلة: 2س² + 5س - 3 = 0"></textarea>
        `;
    } 
    else if (subject ===  physics ) {
        htmlContent = `
            <label for="physicsText">اكتب مسألة الفيزياء أو الكيمياء (المعطيات والمطلوب):</label>
            <textarea id="physicsText" rows="3" placeholder="مثال: جسم مسافته 20 متر بزمن 4 ثوانٍ، احسب السرعة (العجلة)..."></textarea>
        `;
    } 
    else {
        htmlContent = `
            <label for="generalText">اكتب السؤال الوزاري:</label>
            <textarea id="generalText" rows="3" placeholder="اكتب السؤال هنا..."></textarea>
        `;
    }

    container.innerHTML = htmlContent;
}

// دالة مساعدة لإدراج رموز الرياضيات بسرعة في حقل الرياضيات
function insertSymbol(symbol) {
    const textarea = document.getElementById( mathText );
    if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + symbol + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + symbol.length, start + symbol.length);
    }
}

// معاينة الصورة عند رفعها (المسح الضوئي)
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function(){
        const output = document.getElementById( imagePreviewContainer );
        output.innerHTML = `<img src="${reader.result}" alt="معاينة ورقة السؤال">`;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// دالة جلب الحل (قاعدة بيانات محلية أو ربط لاحق بـ API)
function solveQuestion() {
    const grade = document.getElementById( gradeSelect ).value;
    const subject = document.getElementById( subjectSelect ).value;
    const resultSection = document.getElementById( resultSection );
    const answerOutput = document.getElementById( answerOutput );

    // هنا يمكنك إضافة قاعدة بياناتك الخاصة بالأسئلة الوزارية اليمنية للثاسع والثالث الثانوي
    // نموذج تجريبي للرد:
    resultSection.style.display =  block ;
    
    answerOutput.innerHTML = `
        <strong>المرحلة:</strong> ${grade ===  9  ?  التاسع الأساسي  :  الثالث الثانوي }<br>
        <strong>المادة:</strong> ${subject}<br>
        <hr style="margin: 10px 0;">
        <p>جاري مطابقة السؤال مع أرشيف الأسئلة الوزارية للجمهورية اليمنية...</p>
        <p style="color: #28a745; margin-top: 10px;"><strong>الإجابة النموذجية:</strong> تم استلام السؤال بنجاح وسيتم حفظه في أرشيفك على جيت هاب.</p>
    `;
}

          
