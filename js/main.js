// Data
const nanoparticles = [
    { name: "Ferrite Nanoparticles", desc: "High-purity magnetic nanoparticles for biomedical and electronic applications.", icon: "fa-magnet" },
    { name: "Metal Oxide Nanoparticles", desc: "Versatile oxides for catalysis, energy storage, and sensors.", icon: "fa-flask" },
    { name: "Functionalized Nanoparticles", desc: "Surface-modified particles for targeted drug delivery and enhanced compatibility.", icon: "fa-dna" },
    { name: "Carbon based Nanoparticles", desc: "Graphene, CNTs, and fullerenes for superior strength and conductivity.", icon: "fa-layer-group" },
    { name: "Bi-Halide Nanostructures", desc: "Novel structures for next-gen optical devices.", icon: "fa-lightbulb" }
];

const research = [
    { name: "Hydrogen Production", desc: "Advanced nanomaterials for efficient sustainable fuel generation.", icon: "fa-fire-flame-curved" },
    { name: "Hydrogen Gas Sensor", desc: "High-sensitivity sensors for leak detection and safety monitoring.", icon: "fa-gauge-high" },
    { name: "RADAR Absorbing Materials", desc: "Stealth technology materials for improved signal absorption.", icon: "fa-wifi" },
    { name: "Antenna Miniaturisation", desc: "Compact high-performance antenna designs using nanomaterials.", icon: "fa-satellite-dish" },
    { name: "Water Purification", desc: "Nanotechnology-based solutions for clean and safe water.", icon: "fa-droplet" },
    { name: "Microwave Materials", desc: "High-performance materials for microwave frequency applications.", icon: "fa-tower-broadcast" },
    { name: "Agricultural Application", desc: "Innovative nanomaterials for crop protection and yield enhancement.", icon: "fa-leaf" },
    { name: "Thermites", desc: "High-energy materials for specialized industrial and defense applications.", icon: "fa-explosion" }
];

const characterization = [
    { name: "Material Analysis", desc: "Advanced structural and composition analysis.", icon: "fa-microscope" },
    { name: "Purity Testing", desc: "Enuring the highest quality standards for nanomaterials.", icon: "fa-vial" }
];

const products = [
    { name: "Four Layered Mask", desc: "Enhanced protection with advanced filtration layers.", icon: "fa-mask-face" },
    { name: "Alkaline Water Cell", desc: "Efficient cells for alkaline water production.", icon: "fa-bottle-water" },
    { name: "Plasma Explosion for Nanoparticles", desc: "State-of-the-art production method for high-purity nanoparticles.", icon: "fa-bolt" },
    { name: "Electrospinning Devices", desc: "Precision equipment for producing nanofibers.", icon: "fa-spinner" },
    { name: "UV Spectrophotometer", desc: "High-accuracy instruments for optical characterization.", icon: "fa-eye" },
    { name: "Weighing Machine", desc: "Precision balances for laboratory and industrial use.", icon: "fa-scale-balanced" }
];

const consultancy = [
    { name: "Industrial Applications", desc: "Expert advice on integrating nanotechnology into production.", icon: "fa-industry" },
    { name: "Water Treatment Solutions", desc: "Consultancy on using nanoferrites for water purification.", icon: "fa-hands-bubbles" }
];

const industries = [
    "High Frequency Antenna", "Radar Absorption", "Defence & Ammunition",
    "Water Treatment", "Solar Energy", "Hydrogeneration",
    "Dental Implants", "Anti-microbial Coatings", "Anti-static Coatings", "Water Resistant Coatings"
];

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    populateContent();
    initAnimations();
    setupNavigation();
});

// 1. Three.js Background (The "Lattice")
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create Lattice (Points and Lines)
    const geometry = new THREE.IcosahedronGeometry(10, 2); // Radius 10, detail 2
    const wireframe = new THREE.WireframeGeometry(geometry);

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x0ea5e9, // Cyan accent
        transparent: true,
        opacity: 0.15
    });

    const lines = new THREE.LineSegments(wireframe, lineMaterial);
    scene.add(lines);

    // Add Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 40; // Spread 40
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 15;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        lines.rotation.x += 0.001;
        lines.rotation.y += 0.001;

        particlesMesh.rotation.y -= 0.0005;

        // Mouse interaction (gentle parallax)
        // (Simplified for performance)

        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// 2. Populate Content
function populateContent() {
    const createCards = (data, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = ''; // Clear prev content if any (for tabs)
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-icon"><i class="fa-solid ${item.icon}"></i></div>
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
            `;
            container.appendChild(card);
        });
    };

    // Data Categories
    const nanoparticles = [
        { name: "Ferrite Nanoparticles", desc: "High-purity magnetic nanoparticles.", icon: "fa-magnet" },
        { name: "Metal Oxide Nanoparticles", desc: "Versatile oxides for catalysis and sensors.", icon: "fa-flask" },
        { name: "Functionalized Nanoparticles", desc: "Surface-modified particles for targeted delivery.", icon: "fa-dna" },
        { name: "Carbon-Based Nanoparticles", desc: "Graphene, CNTs, and fullerenes.", icon: "fa-layer-group" },
        { name: "Nano-Bio Diesels", desc: "Sustainable energy solutions.", icon: "fa-leaf" },
        { name: "Composite Nanoclusters", desc: "Advanced multi-phase materials.", icon: "fa-atom" },
        { name: "Bi-Halide Nanostructures", desc: "Novel structures for optical devices.", icon: "fa-lightbulb" },
        { name: "Biocompatible Coated Nanoparticles", desc: "Safe coatings for medical implants.", icon: "fa-shield-virus" }
    ];

    const research = [
        { name: "Hydrogen Production", desc: "Advanced nanomaterials for efficient sustainable fuel generation.", icon: "fa-fire-flame-curved" },
        { name: "Hydrogen Gas Sensor", desc: "High-sensitivity sensors for leak detection and safety monitoring.", icon: "fa-gauge-high" },
        { name: "RADAR Absorbing Materials", desc: "Stealth technology materials for improved signal absorption.", icon: "fa-wifi" },
        { name: "Antenna Miniaturisation", desc: "Compact high-performance antenna designs using nanomaterials.", icon: "fa-satellite-dish" },
        { name: "Water Purification", desc: "Nanotechnology-based solutions for clean and safe water.", icon: "fa-droplet" },
        { name: "Microwave Materials", desc: "High-performance materials for microwave frequency applications.", icon: "fa-tower-broadcast" },
        { name: "Agricultural Application", desc: "Innovative nanomaterials for crop protection and yield enhancement.", icon: "fa-leaf" },
        { name: "Thermites", desc: "High-energy materials for specialized industrial and defense applications.", icon: "fa-explosion" }
    ];

    const characterization = [
        { name: "Material Analysis", desc: "Advanced structural and composition analysis.", icon: "fa-microscope" },
        { name: "Purity Testing", desc: "Ensuring the highest quality standards for nanomaterials.", icon: "fa-vial" }
    ];

    const products = [
        { name: "Four Layered Mask", desc: "Enhanced protection with advanced filtration layers.", icon: "fa-mask-face" },
        { name: "Alkaline Water Cell", desc: "Efficient cells for alkaline water production.", icon: "fa-bottle-water" },
        { name: "Plasma Explosion", desc: "State-of-the-art production method.", icon: "fa-bolt" },
        { name: "Electrospinning Devices", desc: "Precision equipment for nanofibers.", icon: "fa-spinner" },
        { name: "UV Spectrophotometer", desc: "High-accuracy instruments.", icon: "fa-eye" },
        { name: "Weighing Machine", desc: "Precision balances.", icon: "fa-scale-balanced" }
    ];

    const services = [
        { name: "Water Treatment", desc: "Using Nanoferrites for purification.", icon: "fa-droplet" },
        { name: "Hydroelectric Cells", desc: "Green energy from humidity.", icon: "fa-bolt" },
        { name: "Anti-Microbial Coatings", desc: "For dental implants and medical devices.", icon: "fa-tooth" },
        { name: "Thermite Materials", desc: "For ammunition applications.", icon: "fa-explosion" },
        { name: "Custom R&D Solutions", desc: "Tailored research for industrial needs.", icon: "fa-microscope" }
    ];

    // Initial Populate
    createCards(nanoparticles, 'nanoparticles-list');
    createCards(research, 'research-list');
    createCards(characterization, 'characterization-list');
    createCards(products, 'products-list');
    createCards(services, 'services-list');

    // Industries
    const industriesCarousel = document.querySelector('.industries-carousel');
    const industryData = [
        "High Frequency Antenna", "Radar Absorption", "Defence & Ammunition",
        "Water Treatment", "Solar Energy", "Hydrogeneration",
        "Dental Implants", "Anti-microbial Coatings", "Anti-static Coatings", "Water Resistant Coatings"
    ];

    if (industriesCarousel) {
        industriesCarousel.innerHTML = '';
        industryData.forEach(ind => {
            const item = document.createElement('div');
            item.className = 'industry-item';
            item.innerText = ind;
            industriesCarousel.appendChild(item);
        });
    }
}

// 3. Animations (GSAP)
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Fade In
    gsap.from('.hero-content', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Section Titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1
        });
    });

    // Cards Stagger
    gsap.utils.toArray('.card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    });

    // Industry Items Stagger
    gsap.from('.industry-item', {
        scrollTrigger: {
            trigger: '.industries-carousel',
            start: 'top 80%',
        },
        scale: 0.5,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    });
}

// 4. Navigation & Tabs
function setupNavigation() {
    // Tabs
    const buttons = document.querySelectorAll('.tab-btn');
    const grids = document.querySelectorAll('.products-grid');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active
            buttons.forEach(b => b.classList.remove('active'));
            grids.forEach(g => g.classList.remove('active'));

            // Add active
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(5, 10, 20, 0.95)';
            navLinks.style.width = '100%';
            navLinks.style.padding = '2rem';
        }
    });
}
