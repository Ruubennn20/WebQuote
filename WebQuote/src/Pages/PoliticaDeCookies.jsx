
import React from 'react'; // Importação do React
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import './PoliticaDeCookies.css'

export default function PoliticaDeCookies() {
    return (
        <>
            <Header />
            <main>
                <br />
                <br />
                <br />
                <h1 className='titleCookies'>WebQuote</h1>
                <div className='politica-de-cookiesText'>
                <h1>Política de Cookies do serviço webquote.pt</h1>

                <p> Para receber informações sobre os seus Dados Pessoais, as finalidades e as partes com as quais os Dados são partilhados, deverá contactar o Proprietário.
      Para mais informações e para compreender os seus direitos, o Utilizador poderá igualmente consultar a versão completa da presente política de privacidade, clicando na hiperligação no canto inferior direito desta página
para o fornecimento do mesmo.

                <h2>Definições e referências legais</h2>

                    O Proprietário reserva-se o direito de alterar a presente política de privacidade a qualquer momento notificando os seus Utilizadores na presente página
                    e eventualmente neste serviço e/ou - desde que técnica e legalmente possível - enviando uma notificação aos Utilizadores através de quaisquer informações de contacto disponíveis para o Proprietário. Recomendamos fortemente que consulte esta página frequentemente, fazendo referência à última modificação descrita na parte inferior.
                    No caso de as alterações afetarem as atividades de tratamento realizadas com base no consentimento do Utilizador, o Proprietário obterá um novo consentimento do Utilizador, quando necessário.
                    para o fornecimento do mesmo.

</p>
</div>

<br />


            </main>
            <Footer />
        </>
    );
}

