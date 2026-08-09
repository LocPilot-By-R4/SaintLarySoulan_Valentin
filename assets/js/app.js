(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  const nav = $('.nav');
  $('.menu-toggle')?.addEventListener('click', () => nav?.classList.toggle('open'));
  $$('.nav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));

  // Prevent a departure date before arrival.
  const arrival = $('#arrival');
  const departure = $('#departure');
  const today = new Date().toISOString().split('T')[0];
  if (arrival) arrival.min = today;
  if (departure) departure.min = today;
  arrival?.addEventListener('change', () => {
    departure.min = arrival.value || today;
    if (departure.value && departure.value < departure.min) departure.value = '';
  });

  $$('.faq-question').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  }));

  const openModal = id => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    modal.querySelector('.modal-close')?.focus();
  };
  const closeModal = modal => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  };
  $$('[data-modal]').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.modal)));
  $$('.modal').forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.modal-close')) closeModal(modal); });
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.modal.open').forEach(closeModal); });



  // Virtual tour scene selector. The HTML is already wired for Photo Sphere Viewer.
  // When the actual viewer is connected, listen for `locpilot:tourSceneChange`
  // and load event.detail.panorama in the viewer.
  const tourSceneButtons = $$('[data-tour-scene]');
  const tourStage = $('[data-tour-stage]');
  const tourCurrentLabel = $('[data-tour-current-label]');
  const selectTourScene = btn => {
    if (!btn) return;
    const panorama = btn.dataset.panorama || '';
    const thumb = btn.dataset.thumb || '';
    const label = btn.dataset.label || '';
    tourSceneButtons.forEach(b => b.classList.toggle('is-active', b.dataset.panorama === panorama));
    if (tourStage && thumb) tourStage.style.backgroundImage = `url("${thumb}")`;
    if (tourCurrentLabel && label) tourCurrentLabel.textContent = label;
    document.dispatchEvent(new CustomEvent('locpilot:tourSceneChange', {
      detail: { panorama, thumb, label }
    }));
  };
  tourSceneButtons.forEach(btn => btn.addEventListener('click', () => {
    selectTourScene(btn);
    if (btn.hasAttribute('data-open-tour')) openModal('tour-modal');
  }));

  $$('.gallery button').forEach(btn => btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const modalImg = $('#gallery-modal-img');
    if (img && modalImg) { modalImg.src = img.src; modalImg.alt = img.alt; openModal('gallery-modal'); }
  }));

  $$('.booking-form').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    openModal('booking-modal');
  }));

  // Weather: no API key. Labels follow the current page language.
  async function loadWeather(){
    const root = $('#weather');
    if(!root) return;
    const lang=(document.documentElement.lang || 'fr').toLowerCase().slice(0,2);
    const i18n={
      fr:{clear:'Ensoleillé',partly:'Peu nuageux',cloudy:'Nuageux',rain:'Pluie',snow:'Neige',variable:'Variable',days:['Demain','J+2','J+3']},
      en:{clear:'Sunny',partly:'Partly cloudy',cloudy:'Cloudy',rain:'Rain',snow:'Snow',variable:'Variable',days:['Tomorrow','D+2','D+3']},
      es:{clear:'Soleado',partly:'Parcialmente nublado',cloudy:'Nublado',rain:'Lluvia',snow:'Nieve',variable:'Variable',days:['Mañana','D+2','D+3']}
    }[lang] || null;
    const t=i18n || {clear:'Sunny',partly:'Partly cloudy',cloudy:'Cloudy',rain:'Rain',snow:'Snow',variable:'Variable',days:['Tomorrow','D+2','D+3']};
    try{
      const url='https://api.open-meteo.com/v1/forecast?latitude=42.817&longitude=0.322&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FParis&forecast_days=4';
      const res=await fetch(url,{cache:'no-store'});
      if(!res.ok) throw new Error('weather');
      const data=await res.json();
      const symbol=code => code===0?'☀️':code<=3?'⛅':code<=48?'☁️':code<=67?'🌧️':code<=77?'❄️':'🌦️';
      const label=code => code===0?t.clear:code<=3?t.partly:code<=48?t.cloudy:code<=67?t.rain:code<=77?t.snow:t.variable;
      $('.weather-temp',root).textContent=Math.round(data.current.temperature_2m)+'°C';
      $('.weather-condition',root).textContent=label(data.current.weather_code);
      $('.weather-symbol',root).textContent=symbol(data.current.weather_code);
      $$('.weather-day',root).forEach((el,i)=>{
        const idx=i+1;
        $('strong',el).textContent=t.days[i];
        $('.day-symbol',el).textContent=symbol(data.daily.weather_code[idx]);
        $('.day-temp',el).textContent=`${Math.round(data.daily.temperature_2m_max[idx])}°/${Math.round(data.daily.temperature_2m_min[idx])}°`;
      });
    }catch(e){ /* fallback intentionally kept */ }
  }
  loadWeather();
})();
