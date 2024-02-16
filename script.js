document.getElementById('signatureForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores dos campos
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var department = document.getElementById('department').value;
    var corporatePhone = document.getElementById('corporatePhone').value;
    var corporatePhoneDDD = document.getElementById('corporatePhoneDDD').value;
    var corporatePhoneNumber = document.getElementById('corporatePhoneNumber').value;
    var operation = document.getElementById('operation').value; // Obter o valor selecionado da ListBox de Operação
    var hasCorporatePhone = document.getElementById('hasCorporatePhone').checked;

    // Gerar a assinatura no padrão desejado
    var logoWeb = '&#160&#160<a href="https://3geo.io"><img src="https://3geo.io/wordpress/wp-content/uploads/2024/02/website-30x30-1.png" alt="Website" style="width: 30px; height: 30px;"></img></a>';
   
    var numeroWpp = 'https://api.whatsapp.com/send/?phone=55' + corporatePhoneDDD + corporatePhoneNumber.replace("-", "") + '&text&type=phone_number&app_absent=0';

    var logoWpp = '&#160&#160<a href="' + numeroWpp + '"><img src="https://3geo.io/wordpress/wp-content/uploads/2024/02/whatsapp-30x30-1.png" alt="WhatsApp" style="width: 30px; height: 30px;"></img></a>';
   
    var logoLinkedin = '<a href="https://www.linkedin.com/company/3geo-consultoria-3geo-consulting/"><img src="https://3geo.io/wordpress/wp-content/uploads/2024/02/linkedin-30x30-1.png" alt="LinkedIn" style="width: 30px; height: 30px;"></a>';

    var mainOfficeInfo = 'Avenida dos Engenheiros, 431,'+ '<br>' +' Manacás, Belo Horizonte - MG<br>' +
    'CEP/Zipcode:  30.840-563';
   
    var phone = 'Telefone: +55 (31) 2117-7080';
    
    var operationalOfficeInfo = ''; // Inicializar a variável para armazenar o valor exclusivo para operationalOffice

    // Tratar a resposta da ListBox de Operação e definir o valor exclusivo para operationalOffice
    switch (operation) {
        case 'RJ':
            operationalOfficeInfo = 'Rua Tupis nº 144 casa 2 ' + '<br>' + 'São Francisco, Niterói, RJ<br>' +
                                     'CEP/ Zipcode: 24.360-400';
            break;
        case 'MG':
            operationalOfficeInfo = 'Rua Santinho Linhares, 34<br>Hamilton, Itabira, MG<br>' +
                                     'CEP/ Zipcode: 35.900-383';
            break;
        case 'SP':
            operationalOfficeInfo = 'Av. das Nações Unidas, 14261,<br> Torre B, São Paulo/SP<br>' +
                                     'CEP/Zipcode:  04.730-090';
            break;
    }

    // Inclui o número do celular corporativo, se aplicável
    var corporatePhoneInfo = '';
    if (corporatePhone === 'true') {
        corporatePhoneInfo = 'Cel: +55 (' + corporatePhoneDDD + ') ' + corporatePhoneNumber + '<br>';
    }

    if (hasCorporatePhone) {
        logoWpp;
    }else {
        logoWpp = '<style display="none"></style>'
    }
    

    // Preencher as células da tabela com as informações
    var signature = '<table style="font-family: Calibri; font-size: 9pt;">' +
                    '<tr>' +
                    '<td class="coluna1" rowspan="2" style="text-align: center;"><img src="https://3geo.io/wordpress/wp-content/uploads/2024/02/logo-3geo-190x60-1.png" alt="Logo 3Geo" style="width: 190; height: 60px;"></td>' +
                        '<td style="vertical-align: top; width: 216px; max-width: 216px"><div class="name16">' + name + '</div><br><div style="vertical-align: bottom;"><strong>' + department + '</strong><br>' + email + '</div></td>' +
                        '<td style="vertical-align: bottom; width: 216px; max-width: 216px"><div class="toTop" style="display: flex; align-items: center;">' + logoLinkedin + logoWeb + logoWpp + '</div>'+ '<div class="toBottom">' + corporatePhoneInfo + phone + '</div></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td style="max-width: 216px;"><strong>MATRIZ: </strong>' + mainOfficeInfo + '</td>' +
                        '<td style="max-width: 216px;"><strong>FILIAL: </strong>' + operationalOfficeInfo + '</td>' +
                    '</tr>' +
                '</table>';

  
    
    // Exibir a assinatura
    document.getElementById('signatureOutput').innerHTML = signature;
    var copyButton = document.getElementById('copyButton');
    copyButton.style.display = 'block';
});

// Mostrar/ocultar campo de texto do número do celular corporativo conforme a seleção
document.getElementById('corporatePhone').addEventListener('change', function() {
    var corporatePhoneSelect = document.getElementById('corporatePhone');
    var corporatePhoneNumberDDD = document.getElementById('corporatePhoneDDD');
    var corporatePhoneNumberInput = document.getElementById('corporatePhoneNumber');
    var corporatePhoneCheckbox = document.getElementById('corporatePhoneCheckbox');

    if (corporatePhoneSelect.value === 'true') {
        corporatePhoneNumberDDD.style.display = 'inline-block';
        corporatePhoneNumberInput.style.display = 'inline-block';
        corporatePhoneNumberDDD.required = true; // Tornar o campo DDD obrigatório
        corporatePhoneNumberInput.required = true; // Tornar o campo Número obrigatório
        corporatePhoneCheckbox.style.display = 'flex';
    } else {
        corporatePhoneNumberDDD.style.display = 'none';
        corporatePhoneNumberInput.style.display = 'none';
        corporatePhoneNumberDDD.required = false; // Remover a obrigatoriedade do campo DDD
        corporatePhoneNumberInput.required = false; // Remover a obrigatoriedade do campo Número
        corporatePhoneCheckbox.style.display = 'none';
    }
});

// Validar o campo corporatePhoneNumber para aceitar apenas números e formatar como xxxx-xxxx ou xxxxx-xxxx
document.getElementById('corporatePhoneNumber').addEventListener('input', function() {
    var phoneNumberValue = this.value;
    // Remove qualquer não dígito do valor do campo
    var sanitizedValue = phoneNumberValue.replace(/\D/g, '');
    // Limita o valor do campo a 9 caracteres
    sanitizedValue = sanitizedValue.slice(0, 9);
    // Formata o número para xxxx-xxxx ou xxxxx-xxxx, dependendo do comprimento
    if (sanitizedValue.length === 8) {
        sanitizedValue = sanitizedValue.replace(/(\d{4})(\d{4})/, "$1-$2");
    } else if (sanitizedValue.length === 9) {
        sanitizedValue = sanitizedValue.replace(/(\d{5})(\d{4})/, "$1-$2");
    }
    // Atualiza o valor do campo
    this.value = sanitizedValue;
});

// Validar o campo corporatePhoneNumberDDD para aceitar apenas 2 caracteres numéricos
document.getElementById('corporatePhoneDDD').addEventListener('input', function() {
    var dddValue = this.value;
    // Remove qualquer não dígito do valor do campo
    var sanitizedValue = dddValue.replace(/\D/g, '');
    // Limita o valor do campo a 2 caracteres
    sanitizedValue = sanitizedValue.slice(0, 2);
    // Atualiza o valor do campo
    this.value = sanitizedValue;
});


document.getElementById('copyButton').addEventListener('click', function() {
    var signatureOutput = document.getElementById('signatureOutput');
    var range = document.createRange();
    range.selectNode(signatureOutput);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Assinatura copiada para a área de transferência!');
});



// Adicione este código dentro da função de carregamento da página
window.addEventListener('DOMContentLoaded', (event) => {
    // Simula um clique no botão "Gerar assinatura"
    document.querySelector('#signatureForm button[type="submit"]').click();
});