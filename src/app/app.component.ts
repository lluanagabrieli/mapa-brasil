import { RouterOutlet } from '@angular/router';
import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

type Estados = {
  [key in 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO']: number;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @Input()
  circuloBorda: string = 'purple';

  @Input()
  circuloPreenchimento: string = 'purple';

  @Input()
  mapaPreenchimento: string = '#D3D3D3';

  @Input()
  mapaCorLinhaEstados: string = 'white';

  @Input()
  corArredorMapa: string = 'white';

  @Input()
  dadosEstados: { abraviacaoEstado: string, estado: string, usuarios: number }[] = [];

  mapa: any;

  private estados: Estados = {
    'AC': 0, 'AL': 0, 'AP': 0, 'AM': 0, 'BA': 0,
    'CE': 0, 'DF': 0, 'ES': 0, 'GO': 0, 'MA': 0,
    'MT': 0, 'MS': 0, 'MG': 0, 'PA': 0, 'PB': 0,
    'PR': 0, 'PE': 0, 'PI': 0, 'RJ': 0, 'RN': 0,
    'RS': 0, 'RO': 0, 'RR': 0, 'SC': 0, 'SP': 0,
    'SE': 0, 'TO': 0
  };

  ngAfterViewInit(): void {
    this.configuracoesMapa();
  }

  configuracoesMapa(): void {
    // Configurações do mapa
    this.mapa = L.map('map', {
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      dragging: false
    }).setView([-14.2350, -51.9253], 4);

    // Fundo nos arredores do mapa
    const mapBounds = this.mapa.getBounds();
    L.rectangle(mapBounds, {
      // color: 'white',
      weight: 0,
      fillColor: this.corArredorMapa,
      fillOpacity: 1
    }).addTo(this.mapa);

    // Estilo para os estados do Brasil
    const estiloEstados = {
      color: this.mapaCorLinhaEstados,
      weight: 2,
      fillColor: this.mapaPreenchimento,
      fillOpacity: 1
    };

    fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, { style: estiloEstados }).addTo(this.mapa);

        // API simulação
        this.apiSimulacao();
      });
  }

  apiSimulacao(): void {
    this.dadosEstados = [
      {
        abraviacaoEstado: 'SP',
        usuarios: 50000,
        estado: 'São Paulo'
      },
      {
        abraviacaoEstado: 'RJ',
        usuarios: 10000,
        estado: 'Rio de Janeiro'
      }
    ];

    this.dadosEstados.forEach(item => {
      const stateCode = item.abraviacaoEstado as keyof Estados;
      this.estados[stateCode] = item.usuarios;
    });

    this.adicionarDemarcacoes();
  }

  adicionarDemarcacoes(): void {
    const estilosCirculo = (circulo: number) => ({
      color: this.circuloBorda,
      fillColor: this.circuloPreenchimento,
      fillOpacity: 0.6,
      radius: Math.sqrt(circulo) * 500
    });

    const coordenadasEstados: { abreviacao: keyof Estados, coordenadas: [number, number] }[] = [
      { abreviacao: 'AC', coordenadas: [-9.0238, -70.8120] },
      { abreviacao: 'AL', coordenadas: [-9.5713, -36.7820] },
      { abreviacao: 'AP', coordenadas: [1.4148, -51.6890] },
      { abreviacao: 'AM', coordenadas: [-3.4168, -65.8561] },
      { abreviacao: 'BA', coordenadas: [-12.9714, -38.5014] },
      { abreviacao: 'CE', coordenadas: [-3.7172, -38.5434] },
      { abreviacao: 'DF', coordenadas: [-15.8267, -47.9218] },
      { abreviacao: 'ES', coordenadas: [-19.1830, -40.3089] },
      { abreviacao: 'GO', coordenadas: [-15.8270, -49.8362] },
      { abreviacao: 'MA', coordenadas: [-2.5307, -44.3068] },
      { abreviacao: 'MT', coordenadas: [-12.6819, -55.5792] },
      { abreviacao: 'MS', coordenadas: [-20.4697, -54.6201] },
      { abreviacao: 'MG', coordenadas: [-18.5122, -44.5550] },
      { abreviacao: 'PA', coordenadas: [-5.3540, -49.1340] },
      { abreviacao: 'PB', coordenadas: [-7.1217, -34.8829] },
      { abreviacao: 'PR', coordenadas: [-25.2521, -52.0216] },
      { abreviacao: 'PE', coordenadas: [-8.0476, -34.8770] },
      { abreviacao: 'PI', coordenadas: [-5.0892, -42.8019] },
      { abreviacao: 'RJ', coordenadas: [-22.9068, -43.1729] },
      { abreviacao: 'RN', coordenadas: [-5.7945, -35.2110] },
      { abreviacao: 'RS', coordenadas: [-30.0346, -51.2177] },
      { abreviacao: 'RO', coordenadas: [-10.8308, -63.2826] },
      { abreviacao: 'RR', coordenadas: [2.8235, -60.6758] },
      { abreviacao: 'SC', coordenadas: [-27.5954, -48.5480] },
      { abreviacao: 'SP', coordenadas: [-23.5505, -46.6333] },
      { abreviacao: 'SE', coordenadas: [-10.9472, -37.0731] },
      { abreviacao: 'TO', coordenadas: [-10.1841, -48.3336] }
    ];

    coordenadasEstados.forEach(estado => {
      const usuariosEstado = this.estados[estado.abreviacao] || 0;

      if(usuariosEstado > 0) {
        L.circle(estado.coordenadas, estilosCirculo(usuariosEstado)).addTo(this.mapa);
      }
    });
  }
}
