class GestorVisual {
    static genId = 0;
    static iconoActivo = {};
    static menuActivo = {};
    static itemActivo = {};
    static tabuladorActivo = {};
    static contenidoActivo = {};
    static esquema = [
        {
            tipo: "iconos-sup",
            iconos: [
                {
                    tipo: "icono",
                    texto: "Home",
                    icono: "bi-house",
                    activo: true,
                    menu: [
                        {
                            tipo: "itemes-sup",
                            texto: "Titulo 1 Superior",
                            itemes: [
                                {
                                    tipo: "actividad",
                                    texto: "Actividad 1",
                                    activo: true
                                },
                                {
                                    tipo: "grupo",
                                    texto: "Grupo 1",
                                    itemes: [
                                        {
                                            tipo: "actividad",
                                            texto: "Actividad 2",
                                            activo: false
                                        },
                                        {
                                            tipo: "actividad",
                                            texto: "Actividad 3",
                                            activo: false
                                        },
                                        {
                                            tipo: "grupo",
                                            texto: "Grupo 2",
                                            itemes: [
                                                {
                                                    tipo: "actividad",
                                                    texto: "Actividad 4",
                                                    activo: false
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tipo: "grupo",
                                    texto: "Grupo 3",
                                    itemes: [
                                        {
                                            tipo: "actividad",
                                            texto: "Actividad 5",
                                            activo: false
                                        },
                                        {
                                            tipo: "actividad",
                                            texto: "Actividad 6",
                                            activo: false
                                        }
                                    ]
                                },
                                {
                                    tipo: "actividad",
                                    texto: "Actividad 7",
                                    activo: false
                                }
                            ]
                        },
                        {
                            // Itemes no utilizados
                            tipo: "itemes-inf",
                            texto: "Titulo 1 Inferior",
                            itemes: []
                        }
                    ]
                },
                {
                    tipo: "icono",
                    texto: "Dashboard",
                    icono: "bi-speedometer2",
                    activo: false,
                    menu: [
                        {
                            tipo: "itemes-sup",
                            texto: "Titulo 2 Superior",
                            itemes: []
                        },
                        {
                            // Itemes no utilizados
                            tipo: "itemes-inf",
                            texto: "Titulo 2 Inferior",
                            itemes: []
                        }
                    ]
                }
            ]
        },
        {
            tipo: "iconos-inf",
            iconos: [
                {
                    tipo: "icono",
                    texto: "Customers",
                    icono: "bi-people",
                    activo: false,
                    menu: [
                        {
                            tipo: "itemes-sup",
                            texto: "Titulo 3 Superior",
                            itemes: []
                        },
                        {
                            // Itemes no utilizados
                            tipo: "itemes-inf",
                            texto: "Titulo 3 Inferior",
                            itemes: []
                        }
                    ]
                }
            ]
        }
    ];

    static cargar(elementos = this.esquema, padre = document.getElementById("sidebar-iconos")) {
        const sidebarItemes = document.getElementById("sidebar-itemes");
        let contenedorNav, contenedorDiv, itemLista, linea, enlace, texto, boton;

        // Lógica para cargar el esquema
        if (elementos.length > 0) {
            elementos.forEach(elemento => {
                switch (elemento.tipo) {
                    case "iconos-sup":
                        console.log("Cargando iconos superiores...");
                        // Contenedor de iconos superiores
                        contenedorNav = document.createElement("nav");
                        contenedorNav.classList.add("nav", "flex-row", "flex-md-column", "mb-auto", "mx-0", "mx-md-auto", "text-center", "mi-nav-color");
                        GestorVisual.cargar(elemento.iconos, contenedorNav);
                        padre.appendChild(contenedorNav);
                        break;
                    case "icono":
                        console.log(`Cargando icono: ${elemento.texto} con clase ${elemento.icono}`);
                        enlace = document.createElement("a");
                        enlace.href = "#";
                        enlace.classList.add("nav-link", "rounded-0", "pb-md-0", "mi-px-075");
                        // Agregar atributo data-rel-id al enlace
                        enlace.dataset.relId = `id-gen${this.genId++}`;
                        enlace.innerHTML = `<i class="bi ${elemento.icono} fs-4"></i>`;
                        contenedorDiv = document.createElement("div");
                        // Agregar id igual al atributo data-rel-id del enlace
                        contenedorDiv.id = enlace.dataset.relId;
                        contenedorDiv.classList.add("d-flex", "flex-column", "flex-grow-1", "d-none");
                        if (elemento.activo) {
                            enlace.classList.add("mi-nav-activo");
                            contenedorDiv.classList.remove("d-none");
                            this.iconoActivo = enlace;
                            this.menuActivo = contenedorDiv;
                        }
                        enlace.addEventListener("click", function (evento) {
                            if (evento.currentTarget.classList.contains("mi-nav-activo")) {
                                sidebarItemes.classList.toggle("sidebar-hidden");
                            } else {
                                sidebarItemes.classList.remove("sidebar-hidden");
                                GestorVisual.iconoActivo.classList.remove("mi-nav-activo");
                                GestorVisual.menuActivo.classList.add("d-none");
                                evento.currentTarget.classList.add("mi-nav-activo");
                                const contenedorRel = document.getElementById(evento.currentTarget.dataset.relId);
                                contenedorRel.classList.remove("d-none");
                                GestorVisual.iconoActivo = evento.currentTarget;
                                GestorVisual.menuActivo = contenedorRel;
                            }
                        });
                        GestorVisual.cargar(elemento.menu, contenedorDiv)
                        sidebarItemes.appendChild(contenedorDiv);
                        padre.appendChild(enlace);
                        break;
                    case "iconos-inf":
                        console.log("Cargando iconos inferiores...");
                        // Línea divisoria
                        linea = document.createElement("hr");
                        linea.classList.add("d-none", "d-md-block", "m-0");
                        padre.appendChild(linea);
                        contenedorDiv = document.createElement("div");
                        contenedorDiv.classList.add("dropdown", "pb-md-2");
                        // Contenedor de iconos inferiores
                        contenedorNav = document.createElement("nav");
                        contenedorNav.classList.add("nav", "flex-row", "flex-md-column", "mb-auto", "mx-0", "mx-md-auto", "text-center", "mi-nav-color");
                        GestorVisual.cargar(elemento.iconos, contenedorNav);
                        contenedorDiv.appendChild(contenedorNav);
                        padre.appendChild(contenedorDiv);
                        break;
                    case "itemes-sup":
                        console.log("Cargando itemes superiores...");
                        contenedorDiv = document.createElement("div");
                        contenedorDiv.classList.add("d-flex", "justify-content-between", "align-items-center", "py-2", "py-md-1");
                        texto = document.createElement("strong");
                        texto.classList.add("ps-1");
                        texto.textContent = elemento.texto;
                        boton = document.createElement("button");
                        boton.type = "button";
                        boton.classList.add("btn", "p-0");
                        boton.innerHTML = `<i class="bi bi-arrow-bar-up fs-4 d-md-none"></i><i class="bi bi-arrow-bar-left fs-4 d-none d-md-block"></i>`;
                        boton.addEventListener("click", function () {
                            // Alterna la clase que empuja el sidebar hacia la izquierda
                            sidebarItemes.classList.toggle("sidebar-hidden");
                        });
                        contenedorDiv.appendChild(texto);
                        contenedorDiv.appendChild(boton);
                        padre.appendChild(contenedorDiv);
                        contenedorNav = document.createElement("ul");
                        contenedorNav.classList.add("nav", "flex-column", "mb-auto", "mi-nav-color");
                        GestorVisual.cargar(elemento.itemes, contenedorNav);
                        padre.appendChild(contenedorNav);
                        break;
                    case "actividad":
                        console.log(`Cargando item: ${elemento.texto}`);
                        itemLista = document.createElement("li");
                        itemLista.classList.add("nav-item");
                        enlace = document.createElement("a");
                        enlace.href = "#";
                        enlace.id = `id-gen${this.genId++}`;
                        enlace.classList.add("nav-link", "px-0", "py-2", "py-md-1", "d-flex", "justify-content-start");
                        // Agregar atributo data-rel-id al enlace
                        enlace.dataset.relId = `id-gen${this.genId++}`;
                        enlace.innerHTML = `<i class="bi bi-dot text-muted"></i><span>${elemento.texto}</span>`;

                        // Crear y relacionar el tabulador y el contenido

                        if (elemento.activo) {
                            enlace.classList.add("mi-nav-activo");
                            // contenedorDiv.classList.remove("d-none");
                            this.itemActivo = enlace;
                            // this.menuActivo = contenedorDiv;
                        }
                        enlace.addEventListener("click", function (evento) {
                            if (evento.currentTarget.classList.contains("mi-nav-activo")) {
                                // sidebarItemes.classList.toggle("sidebar-hidden");
                            } else {
                                // sidebarItemes.classList.remove("sidebar-hidden");
                                GestorVisual.itemActivo.classList.remove("mi-nav-activo");
                                // GestorVisual.menuActivo.classList.add("d-none");
                                evento.currentTarget.classList.add("mi-nav-activo");
                                // const contenedorRel = document.getElementById(evento.currentTarget.dataset.relId);
                                // contenedorRel.classList.remove("d-none");
                                GestorVisual.itemActivo = evento.currentTarget;
                                // GestorVisual.menuActivo = contenedorRel;
                            }
                        });

                        itemLista.appendChild(enlace);
                        padre.appendChild(itemLista);
                        break;
                    case "grupo":
                        console.log(`Cargando gupo: ${elemento.texto}`);
                        itemLista = document.createElement("li");
                        itemLista.classList.add("nav-item");
                        enlace = document.createElement("a");
                        const relId = this.genId++;
                        enlace.href = `#${relId}`;
                        enlace.classList.add("nav-link", "link-dark", "px-0", "py-2", "py-md-1", "d-flex", "align-items-center");
                        // Agregar atributos para colapsar submenu
                        enlace.dataset.bsToggle = "collapse";
                        enlace.role = "button";
                        enlace.ariaExpanded = "false";
                        enlace.innerHTML = `<i class="bi bi-dot text-muted"></i><span>${elemento.texto}</span>
              <small class="text-muted ps-2">&#9662;</small>`;
                        itemLista.append(enlace);
                        contenedorDiv = document.createElement("div");
                        contenedorDiv.id = relId;
                        contenedorDiv.classList.add("collapse", "ps-1", "mb-1");
                        contenedorNav = document.createElement("ul");
                        contenedorNav.classList.add("nav", "flex-column", "border-start", "ps-1", "mi-nav-color");
                        GestorVisual.cargar(elemento.itemes, contenedorNav);
                        contenedorDiv.appendChild(contenedorNav);
                        itemLista.appendChild(contenedorDiv);
                        padre.appendChild(itemLista);
                        break;
                    case "itemes-inf":
                        console.log("Cargando itemes inferiores...");
                        // Itemes no utilizados

                        // Línea divisoria
                        // linea = document.createElement("hr");
                        // linea.classList.add("d-none", "d-md-block", "m-0");
                        // padre.appendChild(linea);
                        // contenedorDiv = document.createElement("div");
                        // contenedorDiv.classList.add("dropdown", "py-2", "py-md-2");
                        // texto = document.createElement("strong");
                        // texto.classList.add("ps-1");
                        // texto.textContent = elemento.texto;
                        // contenedorDiv.appendChild(texto);
                        // padre.appendChild(contenedorDiv);

                        // Crear, cargar y anexar contenedor de itemes al padre
                        break;
                    default:
                        console.log("Tipo de elemento desconocido.");
                }
            });
        }
    }
}

export default GestorVisual;
