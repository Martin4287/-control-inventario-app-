// --- START OF FILE App.tsx ---
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Constants ---
const INITIAL_INVENTORY_DATA = [
  { articulo: "Agua sin gas", parStock: 12 }, { articulo: "Agua con gas", parStock: 12 }, { articulo: "EG Ex Br", parStock: 2 },
  { articulo: "Chandon", parStock: 2 }, { articulo: "Baron B", parStock: 2 }, { articulo: "Coca cola", parStock: 24 },
  { articulo: "Coca zero", parStock: 12 }, { articulo: "Sprite", parStock: 12 }, { articulo: "Sprite Zero", parStock: 12 },
  { articulo: "Tonica", parStock: 12 }, { articulo: "Fanta", parStock: 6 }, { articulo: "FG Chardonnay", parStock: 6 },
  { articulo: "EG Chardonnay", parStock: 4 }, { articulo: "FG Rose", parStock: 4 }, { articulo: "FG Dulce", parStock: 4 },
  { articulo: "EG Reserva Ch", parStock: 2 }, { articulo: "Saint Felicien SB", parStock: 2 }, { articulo: "MEG", parStock: 2 },
  { articulo: "The President", parStock: 2 }, { articulo: "PP Malbec", parStock: 2 }, { articulo: "PP Cab Franc", parStock: 2 },
  { articulo: "EG Reserva Malbec", parStock: 4 }, { articulo: "EG Malbec", parStock: 4 }, { articulo: "EG Cab Franc", parStock: 4 },
  { articulo: "DV Catena Cab- Malb", parStock: 2 }, { articulo: "Saint Felicien Malbec", parStock: 2 }, { articulo: "Saint Felicien Pinot N", parStock: 2 },
  { articulo: "Levite de manzana", parStock: 5 }, { articulo: "Levite de naranja", parStock: 5 }, { articulo: "Levite de pomelo", parStock: 5 },
  { articulo: "Lata Heineken", parStock: 12 }, { articulo: "Lata Imperial", parStock: 6 }
];

const UNIDADES_MEDIDA = ["Unidad", "Kilo", "Litro", "Botella", "Lata", "Caja"];
const PUNTOS_VENTA = ["Desayuno", "Restaurante", "Pastelería", "Banquetes"];

const ARTICULOS_SUGGESTIONS = [
    "Abadejo", "Aceite de girasol x 5 ltr", "Aceite oliva x 5 ltr", "Aceitunas negras x 5 kgr", "Aceitunas verdes x 5 kgr", "Acelga", "Acuarius manzana", "Acuarius naranja", "Agua con gas", "Agua sin gas", "Aji molido", "Alaris Dulce", "Albahaca", "Alcaparras 730gr", "Alcohol para fajinar", "Alfajor de almendras sin tacc", "Almendrado", "Americana", "Aperol x 750", "Apio", "Arroz parboil", "Arvejas", "Atomizador con gatillo", "Azucar en sobres x 800", "Azucar x 25 klgr", "Baccardi Dorado", "Banana", "Baron B Extra brut", "Beefeater", "Berenjenas", "Bife de chorizo", "Bioquitol x 5 ltr", "Blem o lustramuebles", "Bobina de papel 200 mts x 2 uni", "Bolsa de arranque 20 x 25", "Bolsa de arranque 30 x 40", "Bolsa de arranque 40 x 50", "Bolsa de arranque 40 x 70", "Bolsa de arranque 50 x 70", "Bolsa de consorcio x 50", "bombon suizo x 30", "Bondiola de cerdo", "Brocoli", "Cachaca Belho Barreiro", "Cafe de filtro", "cafe en capsulas", "Cafe en granos", "Calabaza", "Calamar entero", "Carne picada", "Carré de cerdo pieza entera", "Cebolla", "Cebolla de verdeo", "Cereales con azucar x 3,4 kgr", "Cereales sin azucar x 3,4 kgr", "Champignon cumana x 2,84 k", "Champiñones lata x 800 gr cumana", "Chandon Ex br", "Chernia", "Choclo en lata 0,8 kgr", "Chocolate submarino x 50", "Chorizo colorado", "Coca cola", "Coca Zero", "Coco rallado", "Cola de langostino", "Coliflor", "Colorante amarillo 5lt", "Colorante caramelo para pan 2lt", "Colorante negro", "Cookies de chocolate sin TACC", "crema de leche x 4 ltr", "Cuadril", "Desengrasante", "Detergente x 5lt", "Dulce de batata x 5k", "Dulce de leche clasico x 5k", "Dulce de leche porcionado 108", "Dulce de leche repostero EL NONO", "Dulce de membrillo", "DV Catena Cabernet - Malbec", "Edulcorante", "Escarbadientes ensobrados x 1000", "Escencia de limón", "Escencia de manteca 2lt", "Escoba con palo", "Esencia de limón x 1ltr", "Esencia de Naranja x 1ltr", "Esencia de vainilla", "Espinaca", "Esponjas de acero", "Esponjas lavaplatos", "Fanta", "Fecula de Maiz", "Finca la linda Malbec", "Folios A4 transparentes", "Fond de Cave Malbec", "Frutilla", "Frutos de mar", "Gin Beafeeter", "Gin Nacional", "Grasa x 5k", "Harina 0000 x 25k", "Heineken Lata", "Helado de Americana", "Helado de Chocolate", "Helado de dulce de leche", "Helado de frutilla", "Hielo", "Huevo", "Huevo liquido", "Imperial Lata", "J&B", "Jalea en caliente", "Jalea en frío", "Jamon cocido", "Jamon crudo", "Jengibre", "Jugo tang naranja x 20 unidades", "Jugo tang pomelo x 20 unidades", "JW Black Label", "Ketchup porcionada", "Kiwi", "Langostinos sin cabeza", "lapicera azul", "Latittud Charnonnay", "Lavandina x 5lt", "Leche de almendras Silk", "Leche entera LV x 12", "Leche LV Descremada X 12", "Lechuga", "Lechuga Morada", "Lemoccelo", "Levadura x 0,5", "Levite Manzana", "Levite naranja", "Levite pomelo", "Limas", "Limon", "Limoncello 1,5 ltr", "Lomo", "Luigi Bosca Chardonnay", "Luigi Bosca Malbec", "Malta", "Mandarina", "Manga de 20cm puede ser descardable", "Manteca pilon 5k", "Manteca porcionada 144 x 10 gr", "Manzana Roja", "Manzana verde", "Margarina batida x 10 kgr", "Margarina hojaldre no vegetal", "Margarina para hojaldre", "Margarina x 5k", "Matambre", "mayonesa porcionada", "mayonesa x 3k", "Membrillo", "Membrillo x 10k", "Merluza", "Mermelada de ciruela porcionada", "Mermelada de durazno light porc", "Mermelada de durazno porcionada", "Mermelada de fruti light porc", "Mermelada de frutilla porcionada", "Mix de frutos de mar", "Moldes para budin de carton", "Moldes para pan dulce x 100 gr", "Moldes para pan dulce x 500 gr", "Moldes para pan dulce x 750 gr", "Monchenot ExBr", "Mopa y palo", "Morron rojo", "Morron verde", "Mozzarella", "Naranja", "Neskuik x 4gkr", "Nueces", "Nugget de pollo", "Palta", "Panceta ahumada", "Papa negra", "Papel film", "Papel Higienico", "Peceto", "Pepino", "Peras", "Perejil", "Pimienta blanca", "Pollo", "Polvo de hornear", "Pomelo", "Porcion de coco sin tacc", "Pulpa de frutilla", "Queso azul", "Queso barra", "Queso Crema 3k", "Queso Sardo horma", "Rebozador x 5 kilos", "Rejillas para cocina", "Repollo colorado", "Revolvedores de plastico trago largo", "Rollo termico para comandera", "Rucula", "Saint felicient Malbec", "sal fina x 500gr", "Salame", "Salchicha", "Salsa caesar 0,9 kgr", "Salsa de chocolate", "San Felipe Chardonnay", "San Telmo ExBr", "Santa julia Malbec", "Secador de piso", "Sprite", "Sprite zero", "Tapa de empanada roticera para freir", "Te clasico", "Té de boldo", "Té de Manzanilla", "Tijera", "Té de Tilo", "Tomate cherry", "Tomate redondo", "Tomate triturado", "Tonica", "Tostadas sin TACC", "Trapo de piso", "Trumpeter Malbec", "Uvas", "Uxmal Chardonnay", "Uxmal malbec", "vasos descartable 500 cc", "Vinagre", "Vino Blanco tetra", "Vino Tinto tetra", "Whisky cocina W", "Yogurt frutilla entero", "Yogurt frutilla Light", "Yogurt vainilla entero", "Yogurt vainilla Light", "Zanahoria", "zapallito verde", "Zapallo anco", "Zucchini", "Pala con Palo", "Queso fresco o cuartirolo", "Salvado", "Trumpeter Chardonnay", "Helados de vainilla", "Don David Malbec", "Aperol", "Emilia Chardonnay", "Chivas 12", "JW Red Label", "Blenders", "Miel", "Gin Tanqueray", "Canelones", "Sandwich j q", "Helados de Limon", "Azucar impalpable", "Azucar Negra", "Maní pelado para bar", "Palitos Snack para bar", "Baccardi Blanco", "Fernet Branca", "Martini Rosso", "Tubos para Rabas", "Caldo Knorr carne", "Caldo Knorr gallina", "Caldo Knorr verduras", "Pimenton dulce", "Emilia Malbec", "Gancia", "Campari", "Burnet´s", "Baileys", "Ajos", "Trapiche Dulce", "Pimienta negra grano", "Ají molido", "Nueces", "Esponja verde gruesa", "Matecocido", "Alma Mora Malbec", "Luigi Bosca Cabernet", "Cilantro", "Ciboulet", "Trapiche Malbec", "Jack Daniels", "Trapiche Reserva Malbec", "Premezcla para budines", "Te de hierbas", "Durazno en almibar", "Anana en almibar", "Tequila Jose cuervo", "Jameson", "Puerro", "Batata", "Roast Beef", "Guantes de nitrilo negros", "Chocolate para reposteria", "Papas Snack para el bar", "Sal gruesa", "Mejillon Pelado", "Cacao Amargo", "Pisco", "Mejorador de pan", "Estevia", "Aceto Balsámico", "Salsa de Soja", "Gambas", "Cinzano rosso", "Oregano", "Nuez moscada", "Almendras", "Maní sin sal", "Avellanas", "Castañas de caju", "Confituras", "Turrón blando", "Mantecol", "M&M", "Pan Dulce", "Focaccia", "Vino Tinto Fiestas", "Vino Blanco Fiestas", "Espumantes Fiestas", "Boconccinos", "Rabanitos", "Jamon crudo premium", "Anchoas", "Ojo de bife", "Paleta", "Boñiato", "Coca 2.25", "Coca Zero 2.25", "Sprite 2.25", "Salmon blanco", "Folex 20 x 25", "Ciruelas", "Durazno", "Sandia", "Melon", "Charlotte", "Cheddar fetas", "Morron amarillo", "Mostaza porcionada", "Aceite de oliva porcionado", "Aceto balsamico porcionado", "Sal porcionada", "Garbanzos", "Twinings canela y manzana", "Twinings limon y gengibre", "Twinings canela y miel", "Twinings limon y frambuesa", "Twinings naranja mango y canela", "PP Malbec", "DON", "MEG", "Escorihuela Gran Reserva Malbec", "Pepinillos", "Crema Chant x 250gr", "FG Chardonnay", "FG Malbec", "FG Rose Malbec", "EG Cabernet Franc", "EG Chardonnay", "EG Malbec", "Menta Fresca", "Tomillo Fresco", "Albahaca Fresca", "Chorizo Picado fino", "Saint felicient Sauv Blanc", "FG Dulce cosecha", "EG Gran Reserva Chardonnay", "PP Cabernet Franc", "The President", "Tia Maria", "Saint Felicien Pinot Noir", "Hilo Choricero", "Martini Dry","Servilletas con logo papel x 1500"
].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

// --- Interfaces de Tipos ---

// Tipos para los elementos del Control de Stock
interface InventoryItem {
    id: number;
    articulo: string;
    parStock: number;
    reposicion: string; // Puede ser string porque es un input, lo convertimos a number después
    control: boolean;
}

// Props para el componente InventoryChecklist
interface InventoryChecklistProps {
    onSave: (items: InventoryItem[]) => void; // onSave recibe un array de InventoryItem
    responsable: string;
}

// Tipos para los elementos del Retiro Manual
interface ManualMovementItem {
    id: number;
    articulo: string;
    cantidad: string; // También puede ser string del input
    unidad: string;
    puntoVenta: string;
}

// Props para el componente ManualMovementForm
interface ManualMovementFormProps {
    onSave: (items: ManualMovementItem[]) => void; // onSave recibe un array de ManualMovementItem
    responsable: string;
}

// Props para el componente AutocompleteInput
interface AutocompleteInputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void; // onBlur es opcional
}

// Tipos para los movimientos guardados (lo que guardas en localStorage)
interface SavedMovementItem {
    articulo: string;
    parStock?: number;        // Opcional para movimientos de stock
    cantidadRepuesta?: string; // Opcional para movimientos de stock
    cantidad?: string;         // Opcional para retiros manuales
    unidad?: string;           // Opcional para retiros manuales
    puntoVenta?: string;       // Opcional para retiros manuales
}

interface Movement {
    id: number;
    fechaHora: string;
    responsable: string;
    type: 'Control de Stock' | 'Retiro Manual'; // Solo estos dos tipos de string
    items: SavedMovementItem[];
}

// Props para el componente MovementCard
interface MovementCardProps {
    movement: Movement;
}

// Props para el componente SavedMovementsDisplay
interface SavedMovementsDisplayProps {
    movements: Movement[];
    onClear: () => void;
    onExportJson: () => void;
    onExportCsv: () => void;
}

// --- InventoryChecklist Component ---
const InventoryChecklist: React.FC<InventoryChecklistProps> = ({ onSave, responsable }) => {
    const initialItems = useMemo(() => INITIAL_INVENTORY_DATA.map((item, index) => ({
        ...item,
        id: index,
        reposicion: '',
        control: false,
    })), []);

    const [items, setItems] = useState<InventoryItem[]>(initialItems);

    const handleInputChange = (id: number, value: string) => {
        const newItems = items.map(item =>
            item.id === id ? { ...item, reposicion: value } : item
        );
        setItems(newItems);
    };

    const handleCheckboxChange = (id: number, checked: boolean) => {
        const newItems = items.map(item =>
            item.id === id ? { ...item, control: checked } : item
        );
        setItems(newItems);
    };

    const handleSave = () => {
        if (!responsable.trim()) {
            alert("Por favor, ingrese el nombre del responsable antes de guardar.");
            return;
        }
        const checkedItems = items.filter(item => item.control);
        if (checkedItems.length === 0) {
            alert("Por favor, marque la casilla de 'Control' en al menos un artículo para guardar.");
            return;
        }
        onSave(checkedItems);
        const newItems = items.map(item =>
            item.control ? { ...item, reposicion: '', control: false } : item
        );
        setItems(newItems);
    };
    
    const renderItemContent = (item: InventoryItem) => {
        const isMatch = item.reposicion !== '' && parseInt(item.reposicion, 10) === item.parStock;
        const cellBgColor = item.reposicion !== '' ? (isMatch ? 'bg-green-100' : 'bg-red-100') : 'bg-white';
        const cardBorderColor = item.reposicion !== '' ? (isMatch ? 'border-green-300' : 'border-red-300') : 'border-gray-200';
        return { cellBgColor, cardBorderColor };
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Control de Stock Diario</h2>
            
            {/* Mobile View: List of Cards */}
            <div className="md:hidden space-y-3">
                {items.map(item => {
                    const { cellBgColor, cardBorderColor } = renderItemContent(item);
                    return (
                        <div key={`mobile-${item.id}`} className={`p-3 rounded-lg border ${cardBorderColor} ${cellBgColor} transition-colors`}>
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex-1">
                                    <p className="font-bold text-gray-800">{item.articulo}</p>
                                    <p className="text-sm text-gray-500">Par Stock: <span className="font-semibold text-gray-700">{item.parStock}</span></p>
                                </div>
                                <div className="flex items-center space-x-3 ml-2">
                                     <input
                                        type="number"
                                        value={item.reposicion}
                                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                                        className="w-16 text-center p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                                        placeholder="Cant."
                                        aria-label={`Reposición para ${item.articulo}`}
                                    />
                                    <input
                                        type="checkbox"
                                        checked={item.control}
                                        onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                        className="h-6 w-6 text-teal-600 border-gray-400 rounded focus:ring-teal-500 cursor-pointer"
                                        aria-label={`Control para ${item.articulo}`}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-teal-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Artículo</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Par Stock</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Reposición</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Control</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item, index) => {
                            const { cellBgColor } = renderItemContent(item);
                            return (
                                <tr key={`desktop-${item.id}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.articulo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center font-semibold">{item.parStock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                        <input
                                            type="number"
                                            value={item.reposicion}
                                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                                            className="w-24 text-center p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                                            placeholder="Cant."
                                        />
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-center transition-colors duration-300 ${cellBgColor}`}>
                                        <input
                                            type="checkbox"
                                            checked={item.control}
                                            onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                            className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-end">
                 <button onClick={handleSave} className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            Guardar Control
                        </button>
                    </div>
                </div>
            );
        };
        
        // --- ManualMovementForm Components ---
        const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ value, onChange, onBlur }) => {
            const [suggestions, setSuggestions] = useState<string[]>([]);
            const [isFocused, setIsFocused] = useState(false);

            const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value;
                onChange(newValue);
                if (newValue.length > 1) {
                    const filtered = ARTICULOS_SUGGESTIONS.filter(s => s.toLowerCase().includes(newValue.toLowerCase()));
                    setSuggestions(filtered.slice(0, 10)); // Limit suggestions
                } else {
                    setSuggestions([]);
                }
            };
            
            const handleSuggestionClick = (suggestion: string) => {
                onChange(suggestion);
                setSuggestions([]);
            };
            
            return (
                <div className="relative w-full">
                    <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            setTimeout(() => setIsFocused(false), 150); // Delay to allow click on suggestion
                            if(onBlur) onBlur();
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Buscar artículo..."
                        autoComplete="off"
                        required
                    />
                    {isFocused && suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                            {suggestions.map((s, i) => (
                                <li key={i} onMouseDown={() => handleSuggestionClick(s)} className="px-4 py-2 cursor-pointer hover:bg-blue-100">
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        };

        const ManualMovementForm: React.FC<ManualMovementFormProps> = ({ onSave, responsable }) => {
            const [items, setItems] = useState<ManualMovementItem[]>([{ id: Date.now(), articulo: '', cantidad: '', unidad: '', puntoVenta: '' }]);

            const handleItemChange = (id: number, field: keyof ManualMovementItem, value: string) => {
                setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
            };

            const addItemRow = () => {
                setItems([...items, { id: Date.now(), articulo: '', cantidad: '', unidad: '', puntoVenta: '' }]);
            };

            const removeItemRow = (id: number) => {
                if (items.length > 1) {
                    setItems(items.filter(item => item.id !== id));
                } else {
                    alert("Debe haber al menos un artículo.");
                }
            };

            const handleSave = () => {
                if (!responsable.trim()) {
                    alert("Por favor, complete el nombre del responsable antes de guardar.");
                    return;
                }

                const validItems = items.filter(i => i.articulo && i.cantidad && parseFloat(i.cantidad) > 0 && i.unidad && i.puntoVenta);
                if (validItems.length !== items.length) {
                    alert("Por favor, complete todos los campos de cada artículo correctamente. La cantidad debe ser mayor a 0.");
                    return;
                }
                onSave(validItems);
                setItems([{ id: Date.now(), articulo: '', cantidad: '', unidad: '', puntoVenta: '' }]);
            };

            return (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Registrar Retiro Manual</h2>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="p-4 border rounded-lg bg-gray-50 space-y-4">
                                <div className="flex justify-between items-start">
                                     <label className="text-sm font-medium text-gray-700 pt-1">Artículo</label>
                                     <button onClick={() => removeItemRow(item.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors">
                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                                <AutocompleteInput value={item.articulo} onChange={value => handleItemChange(item.id, 'articulo', value)} />
                                
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Cantidad</label>
                                        <input type="number" value={item.cantidad} onChange={e => handleItemChange(item.id, 'cantidad', e.target.value)} placeholder="Cant." min="0" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required/>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Unidad</label>
                                        <select value={item.unidad} onChange={e => handleItemChange(item.id, 'unidad', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white" required>
                                            <option value="" disabled>Elegir...</option>
                                            {UNIDADES_MEDIDA.map(u => <option key={u} value={u}>{u}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="text-sm font-medium text-gray-600 block mb-1">Punto de Venta</label>
                                        <select value={item.puntoVenta} onChange={e => handleItemChange(item.id, 'puntoVenta', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white" required>
                                            <option value="" disabled>Elegir...</option>
                                            {PUNTOS_VENTA.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between">
                        <button onClick={addItemRow} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            Agregar Artículo
                        </button>
                        <button onClick={handleSave} className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            Guardar Movimiento
                        </button>
                    </div>
                </div>
            );
        };
        
        // --- SavedMovementsDisplay Components ---
        const MovementCard: React.FC<MovementCardProps> = ({ movement }) => {
            const [isExpanded, setIsExpanded] = useState(false);

            const formatDate = (dateString: string) => {
                try {
                    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(dateString));
                } catch (e) {
                    return dateString;
                }
            };
            
            const isStockItem = () => movement.type === 'Control de Stock'; // <--- SIN el parámetro 'item'
            return (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div
                        className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div>
                            <p className="font-semibold text-gray-800">{movement.type}</p>
                            <p className="text-xs text-gray-500">{formatDate(movement.fechaHora)} - {movement.responsable}</p>
                        </div>
                         <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {isExpanded && (
                        <div className="p-3 bg-white border-t border-gray-200 animate-fade-in">
                            <ul className="space-y-2 text-sm">
                                {movement.items.map((item, index) => (
                                    <li key={index} className="p-2 rounded bg-gray-50 flex justify-between flex-wrap gap-2">
                                        {isStockItem() ? ( // <-- ¡Así es como se llama ahora!
                                            <>
                                                <span className="font-medium text-gray-700">{item.articulo}</span>
                                                <span className="text-gray-600 text-right">Par: {item.parStock} → Rep: {item.cantidadRepuesta}</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-medium text-gray-700">{item.articulo}</span>
                                                <span className="text-gray-600 text-right">Cant: {item.cantidad} {item.unidad?.toLowerCase()}</span>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            );
        };
        
        const SavedMovementsDisplay: React.FC<SavedMovementsDisplayProps> = ({ movements, onClear, onExportJson, onExportCsv }) => {
            const [isCollapsed, setIsCollapsed] = useState(true);
            
            return (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <h2 className="text-2xl font-bold text-gray-800">Movimientos Guardados ({movements.length})</h2>
                         <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-500 transition-transform transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {!isCollapsed && (
                         <div className="mt-4 animate-fade-in">
                            <p className="text-sm text-gray-600 mb-4">Los datos se guardan en el navegador. Puedes exportarlos o limpiarlos.</p>
                            
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                 {movements.length > 0 ? (
                                    // Reverse the array to show most recent first
                                    [...movements].reverse().map(mov => <MovementCard key={mov.id} movement={mov} />)
                                 ) : (
                                    <p className="text-gray-500 text-center py-4">No hay movimientos guardados.</p>
                                 )}
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start flex-wrap">
                                <button onClick={onExportJson} className="flex-grow sm:flex-grow-0 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
                                    Exportar (JSON)
                                </button>
                                <button onClick={onExportCsv} className="flex-grow sm:flex-grow-0 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
                                    Exportar (CSV)
                                </button>
                                <button onClick={onClear} className="flex-grow sm:flex-grow-0 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
                                    Limpiar Datos
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            );
        };
        
        // --- Main App Component ---
        function App() {
            const [fechaHora, setFechaHora] = useState<string>('');
            const [responsable, setResponsable] = useState<string>('');
            const [savedMovements, setSavedMovements] = useState<Movement[]>([]);

            const updateDateTime = useCallback(() => {
                const now = new Date();
                now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                setFechaHora(now.toISOString().slice(0, 16));
            }, []);

            useEffect(() => {
                try {
                    const storedMovements = localStorage.getItem('movimientosMercaderia');
                    if (storedMovements) {
                        setSavedMovements(JSON.parse(storedMovements));
                    }
                    const storedResponsable = localStorage.getItem('responsable');
                    if(storedResponsable) {
                        setResponsable(storedResponsable);
                    }
                } catch (error) {
                    console.error("Error loading data from localStorage", error);
                }
                updateDateTime();
            }, [updateDateTime]);
            
            const handleResponsableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const newResponsable: string = e.target.value;
                setResponsable(newResponsable);
                localStorage.setItem('responsable', newResponsable);
            };

            const persistMovements = (movements: Movement[]) => {
                localStorage.setItem('movimientosMercaderia', JSON.stringify(movements));
                setSavedMovements(movements);
            };

            const handleSaveChecklist = useCallback((checkedItems: InventoryItem[]) => {
                updateDateTime();
                const newMovement: Movement = {
                    id: Date.now(),
                    fechaHora,
                    responsable,
                    type: 'Control de Stock',
                    items: checkedItems.map(({ articulo, parStock, reposicion }) => ({
                        articulo,
                        parStock,
                        cantidadRepuesta: reposicion,
                    })),
                };
                persistMovements([...savedMovements, newMovement]);
                alert('Control de stock guardado localmente!');
            }, [fechaHora, responsable, savedMovements, updateDateTime]);

            const handleSaveManualMovement = useCallback((items: ManualMovementItem[]) => {
                updateDateTime();
                const newMovement: Movement = {
                    id: Date.now(),
                    fechaHora,
                    responsable,
                    type: 'Retiro Manual',
                    items: items.map(({ articulo, cantidad, unidad, puntoVenta }) => ({
                        articulo,
                        cantidad,
                        unidad,
                        puntoVenta,
                    })),
                };
                persistMovements([...savedMovements, newMovement]);
                alert('Movimiento manual guardado localmente!');
            }, [fechaHora, responsable, savedMovements, updateDateTime]);
            
            const handleClearData = () => {
                if (confirm("¿Está seguro de que desea eliminar todos los movimientos guardados? Esta acción no se puede deshacer.")) {
                    localStorage.removeItem('movimientosMercaderia');
                    localStorage.removeItem('responsable');
                    setSavedMovements([]);
                    setResponsable('');
                    alert("Datos limpiados.");
                }
            };

            const exportToJson = () => {
                if (savedMovements.length === 0) {
                    alert("No hay datos para exportar.");
                    return;
                }
                const dataStr = JSON.stringify(savedMovements, null, 2);
                const blob = new Blob([dataStr], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.download = `movimientos_mercaderia_${Date.now()}.json`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            };

            const escapeCsvCell = (cell: string | number | undefined | null) => { // Tipo más específico
                if (cell === null || cell === undefined) {
                    return '';
                }
                const str = String(cell);
                if (str.search(/("|,|\n)/g) >= 0) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            };

            const exportToCsv = () => {
                if (savedMovements.length === 0) {
                    alert("No hay datos para exportar a CSV.");
                    return;
                }
                // Headers need to cover all possible fields from both types of movements
                const headers = ["ID_Movimiento", "Fecha_Hora", "Responsable", "Tipo", "Articulo", "Par_Stock", "Cantidad_Repuesta", "Cantidad_Retirada", "Unidad", "Punto_Venta"];
                const csvRows = [headers.map(escapeCsvCell).join(",")];

                savedMovements.forEach((mov: Movement) => { // Tipo para 'mov'
                    mov.items.forEach((item: SavedMovementItem) => { // Tipo para 'item'
                        const row = [
                            mov.id,
                            mov.fechaHora,
                            mov.responsable,
                            mov.type,
                            item.articulo,
                            mov.type === 'Control de Stock' ? item.parStock : '', // Only for stock control
                            mov.type === 'Control de Stock' ? item.cantidadRepuesta : '', // Only for stock control
                            mov.type === 'Retiro Manual' ? item.cantidad : '', // Only for manual withdrawal
                            mov.type === 'Retiro Manual' ? item.unidad : '', // Only for manual withdrawal
                            mov.type === 'Retiro Manual' ? item.puntoVenta : '', // Only for manual withdrawal
                        ];
                        csvRows.push(row.map(escapeCsvCell).join(","));
                    });
                });

                const csvContent = csvRows.join("\r\n");
                const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                const now = new Date();
                const timestamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
                link.setAttribute("download", `movimientos_mercaderia_${timestamp}.csv`);
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            };

            return (
                <div className="container mx-auto p-2 sm:p-4 md:p-6 max-w-4xl">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Control de Depósito</h1>
                        <p className="text-gray-500 mt-2 text-sm sm:text-base">Control de stock y registro de retiros</p>
                    </header>

                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="form-group">
                                <label htmlFor="fechaHora" className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
                                <input type="datetime-local" id="fechaHora" value={fechaHora} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="responsable" className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                                <input type="text" id="responsable" value={responsable} onChange={handleResponsableChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" placeholder="Nombre del responsable..."/>
                            </div>
                        </div>
                    </div>

                    <InventoryChecklist onSave={handleSaveChecklist} responsable={responsable} />
                    <hr className="my-10 border-t-2 border-gray-200" />
                    <ManualMovementForm onSave={handleSaveManualMovement} responsable={responsable} />
                    <hr className="my-10 border-t-2 border-gray-200" />
                    <SavedMovementsDisplay movements={savedMovements} onClear={handleClearData} onExportJson={exportToJson} onExportCsv={exportToCsv} />
                </div>
            );
        }

export default App;
// --- END OF FILE App.tsx ---
