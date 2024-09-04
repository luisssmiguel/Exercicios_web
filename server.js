const express = require('express');
const app = express();

// 1. Contar o número de vogais em uma string
app.get('/contar-vogais', (req, res) => {
    const { string } = req.query;
    if (!string) return res.send("Por favor, forneça uma string.");
    
    const vogais = string.match(/[aeiou]/gi);
    const count = vogais ? vogais.length : 0;

    res.send(`A string "${string}" contém ${count} vogais.`);
});

// 2. Retorno de um investimento
app.get('/retorno-investimento', (req, res) => {
    const { capital, taxa, tempo } = req.query;

    if (!capital || !taxa || !tempo) return res.send("Por favor, forneça todos os parâmetros: capital, taxa, tempo.");
    
    const C = parseFloat(capital);
    const i = parseFloat(taxa) / 100;
    const t = parseInt(tempo);
    
    const M = C * Math.pow((1 + i), t);
    
    res.send(`O montante após ${t} meses será de R$ ${M.toFixed(2)}.`);
});

// 3. Contar a frequência de um caractere em uma string
app.get('/contar-caractere', (req, res) => {
    const { string, caractere } = req.query;

    if (!string || !caractere) return res.send("Por favor, forneça a string e o caractere.");
    
    const count = (string.split(caractere).length - 1);
    
    res.send(`O caractere "${caractere}" aparece ${count} vezes na string "${string}".`);
});

// 4. Verificar se um ano é bissexto
app.get('/ano-bissexto', (req, res) => {
    const { ano } = req.query;

    if (!ano) return res.send("Por favor, forneça um ano.");
    
    const anoInt = parseInt(ano);
    const isBissexto = (anoInt % 4 === 0 && anoInt % 100 !== 0) || (anoInt % 400 === 0);

    res.send(isBissexto ? `O ano ${ano} é bissexto.` : `O ano ${ano} não é bissexto.`);
});

// 5. Encontrar o menor e maior número em um array
app.get('/menor-maior', (req, res) => {
    const { numeros } = req.query;

    if (!numeros) return res.send("Por favor, forneça um array de números.");
    
    const arrayNumeros = numeros.split(',').map(Number);
    
    const menor = Math.min(...arrayNumeros);
    const maior = Math.max(...arrayNumeros);

    res.send(`O menor número é ${menor} e o maior número é ${maior}.`);
});

// 6. Simular uma loteria
app.get('/loteria', (req, res) => {
    const { numeros } = req.query;

    if (!numeros || numeros.split(',').length !== 6) return res.send("Por favor, forneça 6 números.");
    
    const userNumeros = numeros.split(',').map(Number);
    const sorteio = Array.from({ length: 6 }, () => Math.floor(Math.random() * 60) + 1);

    const acertos = userNumeros.filter(num => sorteio.includes(num)).length;

    res.send(`Números sorteados: ${sorteio.join(', ')}. Você acertou ${acertos} números.`);
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
