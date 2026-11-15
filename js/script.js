/* ========================================================================== 
LÓGICA INTERACTIVA - HCL DIGITAL STUDIO LLC (A11Y &amp; WHATSAPP INTEGRATION) 
========================================================================== */

var quizAnswers = { step1: '', step2: '', step3: '', step4: '', step5: '', recommendedPlan: '$97 USD (Campaña Profesional 4K)' };

// 1\. NAVEGACIÓN Y SELECCIÓN EN EL QUIZ 
function selectQuizOption(step, answerText, suggestedPlan) { quizAnswers['step' + step] = answerText; if (suggestedPlan) { quizAnswers.recommendedPlan = suggestedPlan; } if (step &lt; 5) { goToQuizStep(step + 1); } else { calculateQuizResult(); goToQuizStep(6); } 
}

function preselectPlan(planText) { quizAnswers.recommendedPlan = planText; }

function goToQuizStep(stepNum) { 
	var steps = document.querySelectorAll('.quiz-step'); steps.forEach(function(s) { s.classList.remove('active'); s.style.display = 'none'; // Forzar ocultación sin conflictos CSS }); 
	var currentStep = document.querySelector('.quiz-step[data-step="' + stepNum + '"]'); if (currentStep) { currentStep.classList.add('active'); currentStep.style.display = 'block'; // Forzar visibilidad inmediata } 
	var fill = document.getElementById('quiz-progress-fill'); var counter = document.getElementById('quiz-step-counter'); var progressBar = document.querySelector('.quiz-progress-bar'); if (stepNum &lt;= 5) { var pct = (stepNum / 5) \* 100; if (fill) fill.style.width = pct + '%'; if (counter) counter.innerText = 'Step ' + stepNum + ' of 5'; 
	if (progressBar) progressBar.setAttribute('aria-valuenow', pct); } else { if (fill) fill.style.width = '100%'; if (counter) counter.innerText = 'Diagnostic Completed'; if (progressBar) progressBar.setAttribute('aria-valuenow', 100); } 
}

function calculateQuizResult() { var resPlanElement = document.getElementById('res-plan'); if (resPlanElement) { resPlanElement.innerText = quizAnswers.recommendedPlan; } }

// 2\. ENVÍO DE DATOS A WHATSAPP (GDPR COMPLIANT)
function submitQuizToWhatsApp(event) { event.preventDefault(); 
	var brand = document.getElementById('quiz-brand-name').value; 
	var email = document.getElementById('quiz-email').value; 
	var consent = document.getElementById('quiz-consent').checked; 
	if (!consent) { alert('Please accept the Privacy Policy to proceed.'); return; }

	var message = "Hello HCL Digital Studio LLC! I completed the 4K Production Diagnostic.\\n\\n" + 
	"📌 Brand: " + brand + "\\n" + 
	"✉️ Email: " + email + "\\n\\n" + 
	"📊 Diagnostic Answers:\\n" + 
	"• Stage: " + (quizAnswers.step1 || 'N/A') + "\\n" + 
	"• Objective: " + (quizAnswers.step2 || 'N/A') + "\\n" + 
	"• Challenge: " + (quizAnswers.step3 || 'N/A') + "\\n" + 
	"• Priority: " + (quizAnswers.step4 || 'N/A') + "\\n" + 
	"• Timeline: " + (quizAnswers.step5 || 'N/A') + "\\n\\n" + 
	"💡 Recommended Plan: " + quizAnswers.recommendedPlan + "\\n" + 
	"📲 I want to claim my 24h free watermarked proof of concept for 1 garment!"; 
	
	var encodedMessage = encodeURIComponent(message); 
	var whatsappUrl = "[suspicious link removed]" + encodedMessage; 
	window.open(whatsappUrl, '\_blank'); 
}

// 3\. GESTIÓN DE MODALES LEGALES (A11Y - ESCAPE KEY &amp; FOCUS MANAGEMENT)

var lastActiveElement = null; 
function openModal(modalId) { 
	lastActiveElement = document.activeElement; 
	var modal = document.getElementById(modalId); if (modal) { 
		modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); 
	var closeBtn = modal.querySelector('.modal-close'); 
	if (closeBtn) closeBtn.focus(); } 
}

function closeModal(modalId) { 
	var modal = document.getElementById(modalId); 
	if (modal) { modal.classList.remove('active'); 
	modal.setAttribute('aria-hidden', 'true'); 
	document.body.classList.remove('modal-open'); 
	if (lastActiveElement) lastActiveElement.focus(); } 
}

// Cierre de modales al presionar la tecla ESCAPE
document.addEventListener('keydown', function(e) { 
	if (e.key === 'Escape') { 
		var activeModal = document.querySelector('.modal.active'); 
		if (activeModal) { closeModal(activeModal.id); } 
	} 
});

// 4\. GESTIÓN DEL BANNER DE COOKIES (LOCAL STORAGE)
document.addEventListener('DOMContentLoaded', function() { 
	var consent = localStorage.getItem('hcl\_cookie\_consent'); 
	if (!consent) { 
		var banner = document.getElementById('cookie-banner'); 
		if (banner) { 
			setTimeout(function() { 
				banner.classList.add('active'); 
			}, 1000);  
		} 
	} 
});

function acceptCookies() { 
	localStorage.setItem('hcl\_cookie\_consent', 'accepted'); 
	var banner = document.getElementById('cookie-banner'); 
	if (banner) banner.classList.remove('active'); 
}

function declineCookies() { 
	localStorage.setItem('hcl\_cookie\_consent', 'declined'); 
	var banner = document.getElementById('cookie-banner'); 
	if (banner) banner.classList.remove('active'); 
}


