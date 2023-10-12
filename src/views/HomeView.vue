<script setup lang="ts">
import { ref } from 'vue'
const texts = ref([
  {
    title: 'Introducción',
    text: [
      'También es una herramienta docente que fomenta el aprendizaje en el aula de conceptos científico- técnicos, relacionados con las plantas y su cultivo, de manera sencilla en un ambiente distendido. El argumento del juego es asumir el reto de hacer crecer, mantener y cosechar un cultivo acosado por diversos factores de estrés provocados por los jugadores adversarios.',
      'El juego se puede adaptar a diferentes niveles de educación, desde primaria hasta universitaria. La versión básica está dirigida al público en general y enseñanza secundaria, y está preparada para que puedan jugar entre 2 y 6 participantes. La duración de cada partida dependerá del número de jugadores, no siendo de más de 30 minutos.'
    ]
  },
  {
    title: 'Material',
    text: [
      'El juego consta de 113 cartas:',
      '• 24 cartas de órganos vegetativos: raíz (8), tallo (8) y hojas (8).',
      '• 16 cartas de condiciones inductoras de floración: fotoperiodo (8) y frío (8).',
      '• 14 cartas de estreses: deficiencias minerales (2); Sequía (2); Malas hierbas (2); Insectos defoliadores (2); Insectos áfidos (2); Nematodos (2); Hongos (2).',
      '• 35 cartas de tratamientos para hacer frente a los estreses: fertilizante (5); Riego (5); Herbicida (5); Insecticida (10); Nematicida (5); Fungicida (5).',
      '• 6 cartas comodín',
      '• 3 cartas especiales: Rotación de cultivos (1), Catástrofe (1), Estación tranquila (1).',
      '• 8 cartas de flores',
      '• 7 cartas de frutos'
    ]
  },
  {
    title: 'Preparación',
    text: [
      'Antes de empezar se separan las cartas de flores, frutos y cartas especiales y se colocan a un lado de la mesa en tres montones diferentes. El resto de las cartas se barajan en un mazo común, de este se reparten 4 cartas a cada jugador. Estas cartas solo las puede ver el jugador al que pertenecen. Finalmente se toman las cartas especiales y se mezclan con el mazo restante.'
    ]
  },
  {
    title: 'Objetivo del juego',
    text: [
      'El objetivo de todos los jugadores es conseguir dos frutos. El primero que llegue a conseguir dos cartas de fruto gana la partida. El juego podría continuar para disputarse los siguientes puestos.'
    ]
  },
  {
    title: '¿Cómo se consiguen las cartas de fruto?',
    text: [
      'Las cartas de fruto se obtienen de forma inmediata cuando se consiguen dos cartas de flor. Las cartas de flor sólo se pueden conseguir si se cuenta con una planta completa, sana y sometida a condiciones inductoras de floración. Cuando se reúnen estos requisitos se obtiene automáticamente una carta de flor.'
    ]
  },
  {
    title: ' Una planta completa y sana',
    text: [
      'Un jugador obtiene una planta completa cuando ha colocado delante de él, en la superficie de juego, los órganos vegetativos principales de la planta: raíz, tallo y hojas. Si además la planta no está afectada por ningún estrés estará sana y, por tanto, lista para producir flores.'
    ]
  },
  {
    title: 'Condiciones inductoras de floración',
    text: [
      'A pesar de tener una planta completa y sana, esta solo podrá florecer si está sometida a una condición inductora de floración: fotoperiodo o vernalización. Para aplicar una de estas condiciones se debe colocar la carta correspondiente frente al jugador, se puede colocar antes o después de tener la planta completa. Una carta inductora de floración es suficiente para conseguir una flor, sin embargo, para conseguir una segunda flor se requiere una carta inductora de floración del otro tipo. Es decir, nunca se podrán colocar dos cartas inductoras del mismo tipo.'
    ]
  },
  {
    title: 'Estrés',
    text: [
      'Para evitar que los adversarios se hagan con los frutos es posible estresar su cultivo. Para estresar a la planta de tu adversario puedes jugarle una carta de estrés. Una planta estresada, aunque sea por un solo tipo de factor de estrés, no florecerá incluso a pesar de que esté bajo condiciones inductoras de floración. En el juego hay 7 tipos de estrés diferentes: deficiencias minerales, sequía, malas hierbas, insectos defoliadores, insectos áfidos, nematodos y hongos.',
      'Las cartas de estrés se jugarán encima del cultivo del adversario, incluso aunque este no haya jugado todavía ningún órgano.'
    ]
  },
  {
    title: 'Tratamientos',
    text: [
      'Afortunadamente existe una solución para proteger el cultivo frente a los adversarios: los tratamientos. Pueden usarse como prevención o como remedio; en cualquier caso, una carta de tratamiento neutralizará una carta de estrés específica y ambas se enviarán al mazo de descartes.',
      '(No es posible acumular dos tratamientos iguales sobre el cultivo de un jugador).'
    ]
  },
  {
    title: 'Cartas comodín',
    text: [
      'Las cartas comodín son cartas que pueden actuar como cualquier órgano, tratamiento o condición inductora. Una vez designada como una carta concreta por el jugador no podrá jugarse como otra.'
    ]
  },
  {
    title: 'Cartas especiales',
    text: [
      'Son únicamente tres, se encuentran en el mazo común y cuando su reverso es descubierto por un jugador que está robando cartas del mazo, se han de revelar, activándose de manera inmediata. Estas cartas cuentan con un reverso diferente que las hace distinguibles.'
    ]
  },
  {
    title: 'Dinámica del juego',
    text: [
      'El juego comienza con el turno del jugador situado a la derecha de quien ha repartido las cartas. Durante el turno se puede realizar una de estas dos acciones: (1) jugar una carta de órgano, inductora de floración, o de tratamiento (en este último caso se pueden jugar varias), que pondrás delante de ti, o bien de estrés, que pondrás Carta Efecto Rotación de cultivos Todos los jugadores rotan de cultivo. Los jugadores ceden su cultivo al adversario situado a su derecha. Deben ceder todas las cartas salvo: frutos cosechados, investigaciones activadas, turnos de investigación y cartas de la mano. Catástrofe Los jugadores deben devolver las flores que tengan sobre la mesa y aguardar un turno completo para producir nuevas. Estación tranquila 3 delante del jugador que quieras; o bien, (2) descartarte de las cartas que desees. Las cartas descartadas irán a un mazo de descartes; si el mazo original se acabara, el mazo de descartes se barajaría y actuaría como nuevo mazo. Si todos los jugadores tienen una planta completa las cartas de órganos se descartarán en otro mazo de descartes que se apartará.'
    ]
  },
  {
    title: 'Ganador forzado',
    text: [
      'Si se acaba el mazo de robos por tercera vez ganaría el juego el jugador con mayor número de frutos. En caso de empate se comprobaría el número de flores, y luego el número de estreses activos.'
    ]
  },
  {
    title: 'Recomendaciones para colocar las cartas',
    text: [
      'Los jugadores tendrán siempre 4 cartas ocultas en su mano y podrán tener cartas visibles delante de ellos en la superficie de juego. Estas últimas corresponderán a la planta del jugador, sus tratamientos preventivos, las condiciones inductoras de floración, las flores y los frutos, y los estreses a los que esté sometida. Un ejemplo de distribución sería el siguiente:'
    ],
    images: ['/src/assets/images/howto2.png']
  }
])
</script>

<template>
  <h1 v-show="false">Planta</h1>
  <header>
    <div class="left-side">
      <img class="main-image" src="@/assets/images/planta-imagen.png" alt="" />
      <p class="main-text">
        PLANTA es un juego didáctico de cartas que tiene como objetivo difundir conceptos de
        fisiología y producción vegetal de manera entretenida.
      </p>
      <router-link to="/game">
        <button>Jugar</button>
      </router-link>
      <img class="logo2" src="@/assets/images/logo2.png" alt="" />
      <img class="logo1" src="@/assets/images/logo1.png" alt="" />
    </div>
    <div class="right-side">
      <article class="section" v-for="(text, index) in texts" :key="index">
        <h2 class="section-title">{{ text.title }}</h2>
        <p class="section-text" v-for="(paragraph, index2) in text.text" :key="index2">
          {{ paragraph }}
        </p>
      </article>
      <img class="section-image" src="@/assets/images/howto2.png" alt="" />
    </div>
  </header>
</template>

<style>
.left-side,
.right-side {
  height: 100vh;
  position: absolute;
  top: 0;
}
.left-side {
  width: 35vw;
  background-color: #50ba6c;
  left: 0;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
    left: 0;
    width: 100%;
    overflow-y: visible;
    position: relative;
    box-sizing: border-box;
    height: calc(100vh - 40px);
  }
}
.right-side {
  width: 65vw;
  left: 35vw;
  overflow-y: auto;
  padding: 50px;
  @media only screen and (max-width: 768px) {
    left: 0;
    width: 100%;
    overflow-y: visible;
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 30px;
  }
}
.main-image {
  width: 260px;
  margin: 70px auto 20px;
  display: block;
  @media only screen and (max-width: 768px) {
    width: 220px;
    margin-top: 60px;
  }
}
.logo2 {
  width: 100px;
  left: 30px;
  bottom: 30px;
  position: absolute;
}
.logo1 {
  width: 100px;
  right: 30px;
  bottom: 30px;
  position: absolute;
}
.main-text {
  text-align: center;
  font-size: 25px;
  line-height: 30px;
  width: 80%;
  font-family: 'Bricolage Grotesque', sans-serif;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 27px;
  }
}
.section-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 30px;
  font-weight: bold;
  line-height: 33px;
  margin-bottom: 15px;
}
.section-text {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 18px;
  font-weight: 200;
}
.section-image {
  width: 70%;
  display: block;
  margin: 10px auto;
}
.section {
  margin-bottom: 40px;
}
.play-button {
  background-color: white;
  font-size: 18px;
  display: block;
  margin: 20px auto 0;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    margin-top: 30px;
  }
}
</style>
