// imports
import { DropdownHeader, AccordionSection, Accordion, File, Paragraph, SelectItem, Select, Checkbox, Heading, FormField, Input, Textarea } from '@frontapp/ui-kit';
import React, { useEffect } from 'react';
import { useFrontContext } from '../providers/frontContext';
import { useState } from 'react';

// main function
const Tutorial = () => {
  
  // defining zohoData, isLoading, and isContactFound variables and their set functions
  const [zohoData, setZohoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContactFound, setIsContactFound] = useState(false);

  // defining the geographic area array
  const geographicAreas = [
  { id: 1, display: "NEW ENGLAND: ME - VT - NH - MA - CT - RI" },
  { id: 2, display: "MID-ATLANTIC: NY - PA - NJ" },
  { id: 3, display: "SOUTH ATLANTIC: WV - MD - DE - DC - VA - NC - SC - GA - FL" },
  { id: 4, display: "EAST NORTH CENTRAL: WI - MI - IL - IN - OH" },
  { id: 5, display: "EAST SOUTH CENTRAL: KY - TN - MS - AL" },
  { id: 6, display: "WEST NORTH CENTRAL: ND - SD - NE - KS - MN - IA - MO" },
  { id: 7, display: "WEST SOUTH CENTRAL: OK - AR - TX - LA" },
  { id: 8, display: "WEST MOUNTAIN: MT - ID - WY - NV - UT - CO - AZ - NM" },
  { id: 9, display: "WEST PACIFIC: WA - OR - CA - AK - HI" },
  { id: 10, display: "I WANT A SPECIFIC GEOGRAPHIC AREA" }
  ];
  //  defining selectedAreaIds and its set command
  const [selectedAreaIds, setSelectedAreaIds] = useState([]);

  // defining the itesm array for financing needed
  const items = [
	{ id: 1, display: "-None-"},
	{ id: 2, display: "YES, I'M PRE-APPROVED"},
	{ id: 3, display: "YES, BUT NEED HELP FINDING FINANCING"},
	{ id: 4, display: "NO, I'M GOOD TO GO"}
	];
  // defining selectedItemId and its set command 
  const [selectedItemId, setSelectedItemId] = useState();

  // defining the variables to hold the large text fields
  const [textValue, setTextValue] = useState({
	manufacturingBusiness: '',
	geographicArea: '',
	workExperience: '',
	desiredRole: '',
	involvementType: '',
	industryExperience: '',
	comments: ''
  });

  // defining the contactMethod array
  const contactMethod = [
	{ id: 1, display: "-None-"},
	{ id: 2, display: "Email"}, 
	{ id: 3, display: "Phone"}, 
	];
  // defining selectedMethodId and its set command
  const [selectedMethodId, setSelectedMethodId] = useState();

  // defining the listingAlert array
  const listingAlert = [
	{ id: 1, display: "-None-"},
	{ id: 2, display: "Yes"},
	{ id: 3, display: "No"}
	];
  // defining selectedListingAlertId and its set command
  const [selectedListingAlertId, setSelectedListingAlertId] = useState();

  // defining the buyerType array 
  const buyerType = [
	{ id: 1, display: "-None-"},
        { id: 2, display: "Individual Buyer"},
        { id: 3, display: "Individual Buyer with manufacturing experience"},
        { id: 4, display: "Individual Buyer without manufacturing experience"},
        { id: 5, display: "Private Equity seeking a new platform company"},
        { id: 6, display: "Private Equity seekeing an add on to an existing platform company"},
        { id: 7, display: "I am a strategic buyer"},
        { id: 8, display: "Business Owner with manufacturing experience"},
        { id: 9, display: "Business Owner without manufacturing experience"},
        { id: 10, display: "I am a business broker"},
	];
  // defining selectedBuyerTypeId and its set command
  const [selectedBuyerTypeId, setSelectedBuyerTypeId] = useState();

  //defining the heardAboutUs array
  const heardAboutUs = [ 
	{ id: 1, display: "Google search"},
        { id: 2, display: "Trade website"},
        { id: 3, display: "Trade magazine"},
        { id: 4, display: "Online ad"},
        { id: 5, display: "Marketing email"},
        { id: 6, display: "LinkedIn"},
        { id: 7, display: "Twitter"},
        { id: 8, display: "Facebook"},
        { id: 9, display: "BizBuySell"},
        { id: 10, display: "Other/Referral"},
	];

  // defining selectedHeardAboutUsId and its set command
  const [selectedHeardAboutUsId, setSelectedHeardAboutUsId] = useState([]);
 
  // defining the sicCodes array
  const sicCodes = [
	{ id: 1, display: "20__ Food and Kindred"},
	{ id: 2, display: "2011 Meat packing plants"},
	{ id: 3, display: "2013 Sausages and other prepared meats"},
	{ id: 4, display: "2015 Poultry slaughtering and processing"},
	{ id: 5, display: "2021 Creamery butter"},
	{ id: 6, display: "2022 Cheese; natural and processed"},
	{ id: 7, display: "2023 Dry, condensed, evaporated products"},
	{ id: 8, display: "2024 Ice cream and frozen deserts"},
	{ id: 9, display: "2026 Fluid milk"},
	{ id: 10, display: "2032 Canned specialties"},
	{ id: 11, display: "2033 Canned fruits and specialties"},
	{ id: 12, display: "2034 Dehydrated fruits, vegetables, soups"},
	{ id: 13, display: "2035 Pickles, sauces, and salad dressings"},
	{ id: 14, display: "2037 Frozen fruits and vegetables"},
	{ id: 15, display: "2038 Frozen specialties, Not Elsewhere Classified"},
	{ id: 16, display: "2041 Flour and other grain mill products"},
	{ id: 17, display: "2043 Cereal breakfast foods"},
	{ id: 18, display: "2044 Rice milling"},
	{ id: 19, display: "2045 Prepared flour mixes and doughs"},
	{ id: 20, display: "2046 Wet corn milling"},
	{ id: 21, display: "2047 Dog and cat food"},
	{ id: 22, display: "2048 Prepared feeds, Not Elsewhere Classified"},
	{ id: 23, display: "2051 Bread, cake, and related products"},
	{ id: 24, display: "2052 Cookies and crackers"},
	{ id: 25, display: "2053 Frozen bakery products, except bread"},
	{ id: 26, display: "2061 Raw cane sugar"},
	{ id: 27, display: "2062 Cane sugar refining"},
	{ id: 28, display: "2063 Beet sugar"},
	{ id: 29, display: "2064 Candy and other confectionery products"},
	{ id: 30, display: "2066 Chocolate and cocoa products"},
	{ id: 31, display: "2067 Chewing gum"},
	{ id: 32, display: "2068 Salted and roasted nuts and seeds"},
	{ id: 33, display: "2074 Cottonseed oil mills"},
	{ id: 34, display: "2075 Soybean oil mills"},
	{ id: 35, display: "2076 Vegetable oil mills, Not Elsewhere Classified"},
	{ id: 36, display: "2077 Animal and marine fats and oils"},
	{ id: 37, display: "2079 Edible fats and oils"},
	{ id: 38, display: "2082 Malt beverages"},
	{ id: 39, display: "2083 Malt"},
	{ id: 40, display: "2084 Wines, brandy, and brandy spirits"},
	{ id: 41, display: "2085 Distilled and blended liquors"},
	{ id: 42, display: "2086 Bottled and canned soft drinks"},
	{ id: 43, display: "2087 Flavoring extracts and syrups, Not Elsewhere Classified"},
	{ id: 44, display: "2091 Canned and cured fish and seafoods"},
	{ id: 45, display: "2092 Fresh or frozen packaged fish"},
	{ id: 46, display: "2095 Roasted coffee"},
	{ id: 47, display: "2096 Potato chips and similar snacks"},
	{ id: 48, display: "2097 Manufactured ice"},
	{ id: 49, display: "2098 Macaroni and spaghetti"},
	{ id: 50, display: "2099 Food preparations, Not Elsewhere Classified"},
	{ id: 51, display: "21__ Tobacco Products"},
	{ id: 52, display: "2111 Cigarettes"},
	{ id: 53, display: "2121 Cigars"},
	{ id: 54, display: "2131 Chewing and smoking tobacco"},
	{ id: 55, display: "2141 Tobacco stemming and redrying"},
	{ id: 56, display: "22__ Textile Mill Products"},
	{ id: 57, display: "2211 Broadwoven fabric mills, cotton"},
	{ id: 58, display: "2221 Broadwoven fabric mills, manmade"},
	{ id: 59, display: "2231 Broadwoven fabric mills, wool"},
	{ id: 60, display: "2241 Narrow fabric mills"},
	{ id: 61, display: "2251 Women's hosiery, except socks"},
	{ id: 62, display: "2252 Hosiery, Not Elsewhere Classified"},
	{ id: 63, display: "2253 Knit outerwear mills"},
	{ id: 64, display: "2254 Knit underwear mills"},
	{ id: 65, display: "2257 Weft knit fabric mills"},
	{ id: 66, display: "2258 Lace and warp knit fabric mills"},
	{ id: 67, display: "2259 Knitting mills, Not Elsewhere Classified"},
	{ id: 68, display: "2261 Finishing plants, cotton"},
	{ id: 69, display: "2262 Finishing plants, manmade"},
	{ id: 70, display: "2269 Finishing plants, Not Elsewhere Classified"},
	{ id: 71, display: "2273 Carpets and rugs"},
	{ id: 72, display: "2281 Yarn spinning mills"},
	{ id: 73, display: "2282 Throwing and winding mills"},
	{ id: 74, display: "2284 Thread mills"},
	{ id: 75, display: "2295 Coated fabrics, not rubberized"},
	{ id: 76, display: "2296 Tire cord and fabrics"},
	{ id: 77, display: "2297 Nonwoven fabrics"},
	{ id: 78, display: "2298 Cordage and twine"},
	{ id: 79, display: "2299 Textile goods, Not Elsewhere Classified"},
	{ id: 80, display: "23__ Apparel, Finished Prdcts from Fabrics & Similar Materials"},
	{ id: 81, display: "2311 Men's and boy's suits and coats"},
	{ id: 82, display: "2321 Men's and boy's furnishings"},
	{ id: 83, display: "2322 Men's and boy's underwear and nightwear"},
	{ id: 84, display: "2323 Men's and boy's neckwear"},
	{ id: 85, display: "2325 Men's and boy's trousers and slacks"},
	{ id: 86, display: "2326 Men's and boy's work clothing"},
	{ id: 87, display: "2329 Men's and boy's clothing, Not Elsewhere Classified"},
	{ id: 88, display: "2331 Women's and misses' blouses and shirts"},
	{ id: 89, display: "2335 Women's, junior's, and misses' dresses"},
	{ id: 90, display: "2337 Women's and misses' suits and coats"},
	{ id: 91, display: "2339 Women's and misses' outerwear, Not Elsewhere Classified"},
	{ id: 92, display: "2341 Women's and children's underwear"},
	{ id: 93, display: "2342 Bras, girdles, and allied garments"},
	{ id: 94, display: "2353 Hats, caps, and millinery"},
	{ id: 95, display: "2361 Girl's and children's dresses, blouses"},
	{ id: 96, display: "2369 Girl's and children's outerwear, Not Elsewhere Classified"},
	{ id: 97, display: "2371 Fur goods"},
	{ id: 98, display: "2381 Fabric dress and work gloves"},
	{ id: 99, display: "2384 Robes and dressing gowns"},
	{ id: 100, display: "2385 Waterproof outerwear"},
	{ id: 101, display: "2386 Leather and sheep-lined clothing"},
	{ id: 102, display: "2387 Apparel belts"},
	{ id: 103, display: "2389 Apparel and accessories, Not Elsewhere Classified"},
	{ id: 104, display: "2391 Curtains and draperies"},
	{ id: 105, display: "2392 Household furnishings, Not Elsewhere Classified"},
	{ id: 106, display: "2393 Textile bags"},
	{ id: 107, display: "2394 Canvas and related products"},
	{ id: 108, display: "2395 Pleating and stitching"},
	{ id: 109, display: "2396 Automotive and apparel trimmings"},
	{ id: 110, display: "2397 Schiffli machine embroideries"},
	{ id: 111, display: "2399 Fabricated textile products, Not Elsewhere Classified"},
	{ id: 112, display: "24__ Lumber and Wood Products, Except Furniture"},
	{ id: 113, display: "2411 Logging"},
	{ id: 114, display: "2421 Sawmills and planing mills, general"},
	{ id: 115, display: "2426 Hardwood dimension and flooring mills"},
	{ id: 116, display: "2429 Special product sawmills, Not Elsewhere Classified"},
	{ id: 117, display: "2431 Millwork"},
	{ id: 118, display: "2434 Wood kitchen cabinets"},
	{ id: 119, display: "2435 Hardwood veneer and plywood"},
	{ id: 120, display: "2436 Softwood veneer and plywood"},
	{ id: 121, display: "2439 Structural wood members, Not Elsewhere Classified"},
	{ id: 122, display: "2441 Nailed wood boxes and shook"},
	{ id: 123, display: "2448 Wood pallets and skids"},
	{ id: 124, display: "2449 Wood containers, Not Elsewhere Classified"},
	{ id: 125, display: "2451 Mobile homes"},
	{ id: 126, display: "2452 Prefabricated wood buildings"},
	{ id: 127, display: "2491 Wood preserving"},
	{ id: 128, display: "2493 Reconstituted wood products"},
	{ id: 129, display: "2499 Wood products, Not Elsewhere Classified"},
	{ id: 130, display: "25__ Furniture and fixtures"},
	{ id: 131, display: "2511 Wood household furniture"},
	{ id: 132, display: "2512 Upholstered household furniture"},
	{ id: 133, display: "2514 Metal household furniture"},
	{ id: 134, display: "2515 Mattresses and bedsprings"},
	{ id: 135, display: "2517 Wood television and radio cabinets"},
	{ id: 136, display: "2519 Household furniture, Not Elsewhere Classified"},
	{ id: 137, display: "2521 Wood office furniture"},
	{ id: 138, display: "2522 Office furniture, except wood"},
	{ id: 139, display: "2531 Public building and related furniture"},
	{ id: 140, display: "2541 Wood partitions and fixtures"},
	{ id: 141, display: "2542 Partitions and fixtures, except wood"},
	{ id: 142, display: "2591 Drapery hardware and blinds and shades"},
	{ id: 143, display: "2599 Furniture and fixtures, Not Elsewhere Classified"},
	{ id: 144, display: "26__ Paper and Allied Products"},
	{ id: 145, display: "2611 Pulp mills"},
	{ id: 146, display: "2621 Paper mills"},
	{ id: 147, display: "2631 Paperboard mills"},
	{ id: 148, display: "2652 Setup paperboard boxes"},
	{ id: 149, display: "2653 Corrugated and solid fiber boxes"},
	{ id: 150, display: "2655 Fiber cans, drums, and similar products"},
	{ id: 151, display: "2656 Sanitary food containers"},
	{ id: 152, display: "2657 Folding paperboard boxes"},
	{ id: 153, display: "2671 Paper; coated and laminated packaging"},
	{ id: 154, display: "2672 Paper; coated and laminated, Not Elsewhere Classified"},
	{ id: 155, display: "2673 Bags: plastic, laminated, and coated"},
	{ id: 156, display: "2674 Bags: uncoated paper and multiwall"},
	{ id: 157, display: "2675 Die-cut paper and board"},
	{ id: 158, display: "2676 Sanitary paper products"},
	{ id: 159, display: "2677 Envelopes"},
	{ id: 160, display: "2678 Stationery products"},
	{ id: 161, display: "2679 Converted paper products, Not Elsewhere Classified"},
	{ id: 162, display: "27__ Printing, Publishing and Allied Industries"},
	{ id: 163, display: "2711 Newspapers"},
	{ id: 164, display: "2721 Periodicals"},
	{ id: 165, display: "2731 Book publishing"},
	{ id: 166, display: "2732 Book printing"},
	{ id: 167, display: "2741 Miscellaneous publishing"},
	{ id: 168, display: "2752 Commercial printing, lithographic"},
	{ id: 169, display: "2754 Commercial printing, gravure"},
	{ id: 170, display: "2759 Commercial printing, Not Elsewhere Classified"},
	{ id: 171, display: "2761 Manifold business forms"},
	{ id: 172, display: "2771 Greeting cards"},
	{ id: 173, display: "2782 Blankbooks and looseleaf binders"},	
	{ id: 174, display: "2789 Bookbinding and related work"},
	{ id: 175, display: "2791 Typesetting"},
	{ id: 176, display: "2796 Platemaking services"},
	{ id: 177, display: "28__ Chemicals and Allied Products"},
	{ id: 178, display: "2812 Alkalies and chlorine"},
	{ id: 179, display: "2813 Industrial gases"},
	{ id: 180, display: "2816 Inorganic pigments"},
	{ id: 181, display: "2819 Industrial inorganic chemicals, Not Elsewhere Classified"},
	{ id: 182, display: "2821 Plastics materials and resins"},
	{ id: 183, display: "2822 Synthetic rubber"},
	{ id: 184, display: "2823 Cellulosic manmade fibers"},
	{ id: 185, display: "2824 Organic fibers, noncellulosic"},
	{ id: 186, display: "2833 Medicinals and botanicals"},
	{ id: 187, display: "2834 Pharmaceutical preparations"},
	{ id: 188, display: "2835 Diagnostic substances"},
	{ id: 189, display: "2836 Biological products, except diagnostic"},
	{ id: 190, display: "2841 Soap and other detergents"},
	{ id: 191, display: "2842 Polishes and sanitation goods"},
	{ id: 192, display: "2843 Surface active agents"},
	{ id: 193, display: "2844 Toilet preparations"},
	{ id: 194, display: "2851 Paints and allied products"},
	{ id: 195, display: "2861 Gum and wood chemicals"},
	{ id: 196, display: "2865 Cyclic crudes and intermediates"},
	{ id: 197, display: "2869 Industrial organic chemicals, Not Elsewhere Classified"},
	{ id: 198, display: "2873 Nitrogenous fertilizers"},
	{ id: 199, display: "2874 Phosphatic fertilizers"},
	{ id: 200, display: "2875 Fertilizers, mixing only"},
	{ id: 201, display: "2879 Agricultural chemicals, Not Elsewhere Classified"},
	{ id: 202, display: "2891 Adhesives and sealants"},
	{ id: 203, display: "2892 Explosives"},
	{ id: 204, display: "2893 Printing ink"},
	{ id: 205, display: "2895 Carbon black"},
	{ id: 206, display: "2899 Chemical preparations, Not Elsewhere Classified"},
	{ id: 207, display: "29__ Petroleum Refining and Related Industries"},
	{ id: 208, display: "2911 Petroleum refining"},
	{ id: 209, display: "2951 Asphalt paving mixtures and blocks"},
	{ id: 210, display: "2952 Asphalt felts and coatings"},
	{ id: 211, display: "2992 Lubricating oils and greases"},
	{ id: 212, display: "2999 Petroleum and coal products, Not Elsewhere Classified"},
	{ id: 213, display: "30__ Rubber and Miscellaneous Plastic Products"},
	{ id: 214, display: "3011 Tires and inner tubes"},
	{ id: 215, display: "3021 Rubber and plastics footwear"},
	{ id: 216, display: "3052 Rubber and plastics hose and beltings"},
	{ id: 217, display: "3053 Gaskets; packing and sealing devices"},
	{ id: 218, display: "3061 Mechanical rubber goods"},
	{ id: 219, display: "3069 Fabricated rubber products, Not Elsewhere Classified"},
	{ id: 220, display: "3081 Unsupported plastics film and sheet"},
	{ id: 221, display: "3082 Unsupported plastics profile shapes"},
	{ id: 222, display: "3083 Laminated plastics plate and sheet"},
	{ id: 223, display: "3084 Plastics pipe"},
	{ id: 224, display: "3085 Plastics bottles"},
	{ id: 225, display: "3086 Plastics foam products"},
	{ id: 226, display: "3087 Custom compound purchased resins"},
	{ id: 227, display: "3088 Plastics plumbing fixtures"},
	{ id: 228, display: "3089 Plastics products, Not Elsewhere Classified"},
	{ id: 229, display: "31__ Leather and Leather Products"},
	{ id: 230, display: "3111 Leather tanning and finishing"},
	{ id: 231, display: "3131 Footwear cut stock"},
	{ id: 232, display: "3142 House slippers"},
	{ id: 233, display: "3143 Men's footwear, except athletic"},
	{ id: 234, display: "3144 Women's footwear, except athletic"},
	{ id: 235, display: "3149 Footwear, except rubber, Not Elsewhere Classified"},
	{ id: 236, display: "3151 Leather gloves and mittens"},
	{ id: 237, display: "3161 Luggage"},
	{ id: 238, display: "3171 Women's handbags and purses"},
	{ id: 239, display: "3172 Personal leather goods, Not Elsewhere Classified"},
	{ id: 240, display: "3199 Leather goods, Not Elsewhere Classified"},
	{ id: 241, display: "32__ Stone, Clay, Glass, and Concrete Products"},
	{ id: 242, display: "3211 Flat glass"},
	{ id: 243, display: "3221 Glass containers"},
	{ id: 244, display: "3229 Pressed and blown glass, Not Elsewhere Classified"},
	{ id: 245, display: "3231 Products of purchased glass"},
	{ id: 246, display: "3241 Cement, hydraulic"},
	{ id: 247, display: "3251 Brick and structural clay tile"},
	{ id: 248, display: "3253 Ceramic wall and floor tile"},
	{ id: 249, display: "3255 Clay refractories"},
	{ id: 250, display: "3259 Structural clay products, Not Elsewhere Classified"},
	{ id: 251, display: "3261 Vitreous plumbing fixtures"},
	{ id: 252, display: "3262 Vitreous china table and kitchenware"},
	{ id: 253, display: "3263 Semivitreous table and kitchenware"},
	{ id: 254, display: "3264 Porcelain electrical supplies"},
	{ id: 255, display: "3269 Pottery products, Not Elsewhere Classified"},
	{ id: 256, display: "3271 Concrete block and brick"},
	{ id: 257, display: "3272 Concrete products, Not Elsewhere Classified"},
	{ id: 258, display: "3273 Ready-mixed concrete"},
	{ id: 259, display: "3274 Lime"},
	{ id: 260, display: "3275 Gypsum products"},
	{ id: 261, display: "3281 Cut stone and stone products"},
	{ id: 262, display: "3291 Abrasive products"},
	{ id: 263, display: "3292 Asbestos products"},
	{ id: 264, display: "3295 Minerals, ground or treated"},
	{ id: 265, display: "3296 Mineral wool"},
	{ id: 266, display: "3297 Nonclay refractories"},
	{ id: 267, display: "3299 Nonmetallic mineral products,"},
	{ id: 268, display: "33__ Primary Metal Industries"},
	{ id: 269, display: "3312 Blast furnaces and steel mills"},
	{ id: 270, display: "3313 Electrometallurgical products"},
	{ id: 271, display: "3315 Steel wire and related products"},
	{ id: 272, display: "3316 Cold finishing of steel shapes"},
	{ id: 273, display: "3317 Steel pipe and tubes"},
	{ id: 274, display: "3321 Gray and ductile iron foundries"},
	{ id: 275, display: "3322 Malleable iron foundries"},
	{ id: 276, display: "3324 Steel investment foundries"},
	{ id: 277, display: "3325 Steel foundries, Not Elsewhere Classified"},
	{ id: 278, display: "3331 Primary copper"},
	{ id: 279, display: "3334 Primary aluminum"},
	{ id: 280, display: "3339 Primary nonferrous metals, Not Elsewhere Classified"},
	{ id: 281, display: "3341 Secondary nonferrous metals"},
	{ id: 282, display: "3351 Copper rolling and drawing"},
	{ id: 283, display: "3353 Aluminum sheet, plate, and foil"},
	{ id: 284, display: "3354 Aluminum extruded products"},
	{ id: 285, display: "3355 Aluminum rolling and drawing, Not Elsewhere Classified"},
	{ id: 286, display: "3356 Nonferrous rolling and drawing, Not Elsewhere Classified"},
	{ id: 287, display: "3357 Nonferrous wiredrawing and insulating"},
	{ id: 288, display: "3363 Aluminum die-castings"},
	{ id: 289, display: "3364 Nonferrous die-castings except aluminum"},
	{ id: 290, display: "3365 Aluminum foundries"},
	{ id: 291, display: "3366 Copper foundries"},
	{ id: 292, display: "3369 Nonferrous foundries, Not Elsewhere Classified"},
	{ id: 293, display: "3398 Metal heat treating"},
	{ id: 294, display: "3399 Primary metal products"},
	{ id: 295, display: "34__ Fabricated Metal Prdcts, Except Machinery & Transport Eqpmnt"},
	{ id: 296, display: "3411 Metal cans"},
	{ id: 297, display: "3412 Metal barrels, drums, and pails"},
	{ id: 298, display: "3421 Cutlery"},
	{ id: 299, display: "3423 Hand and edge tools, Not Elsewhere Classified"},
	{ id: 300, display: "3425 Saw blades and handsaws"},
	{ id: 301, display: "3429 Hardware, Not Elsewhere Classified"},
	{ id: 302, display: "3431 Metal sanitary ware"},
	{ id: 303, display: "3432 Plumbing fixture fittings and trim"},
	{ id: 304, display: "3433 Heating equipment, except electric"},
	{ id: 305, display: "3441 Fabricated structural metal"},
	{ id: 306, display: "3442 Metal doors, sash, and trim"},
	{ id: 307, display: "3443 Fabricated plate work (boiler shop)"},
	{ id: 308, display: "3444 Sheet metalwork"},
	{ id: 309, display: "3446 Architectural metalwork"},
	{ id: 310, display: "3448 Prefabricated metal buildings"},
	{ id: 311, display: "3449 Miscellaneous metalwork"},
	{ id: 312, display: "3451 Screw machine products"},
	{ id: 313, display: "3452 Bolts, nuts, rivets, and washers"},
	{ id: 314, display: "3462 Iron and steel forgings"},
	{ id: 315, display: "3463 Nonferrous forgings"},
	{ id: 316, display: "3465 Automotive stampings"},
	{ id: 317, display: "3466 Crowns and closures"},
	{ id: 318, display: "3469 Metal stampings, Not Elsewhere Classified"},
	{ id: 319, display: "3471 Plating and polishing"},
	{ id: 320, display: "3479 Metal coating and allied services"},
	{ id: 321, display: "3482 Small arms ammunition"},
	{ id: 322, display: "3483 Ammunition, except for small arms, Not Elsewhere Classified"},
	{ id: 323, display: "3484 Small arms"},
	{ id: 324, display: "3489 Ordnance and accessories, Not Elsewhere Classified"},
	{ id: 325, display: "3491 Industrial valves"},
	{ id: 326, display: "3492 Fluid power valves and hose fittings"},
	{ id: 327, display: "3493 Steel springs, except wire"},
	{ id: 328, display: "3494 Valves and pipe fittings, Not Elsewhere Classified"},
	{ id: 329, display: "3495 Wire springs"},
	{ id: 330, display: "3496 Miscellaneous fabricated wire products"},
	{ id: 331, display: "3497 Metal foil and leaf"},
	{ id: 332, display: "3498 Fabricated pipe and fittings"},
	{ id: 333, display: "3499 Fabricated metal products, Not Elsewhere Classified"},
	{ id: 334, display: "35__ Industrial and Commercial Machinery and Computer Eqpmnt"},
	{ id: 335, display: "3511 Turbines and turbine generator sets"},
	{ id: 336, display: "3519 Internal combustion engines, Not Elsewhere Classified"},
	{ id: 337, display: "3523 Farm machinery and equipment"},
	{ id: 338, display: "3524 Lawn and garden equipment"},
	{ id: 339, display: "3531 Construction machinery"},
	{ id: 340, display: "3532 Mining machinery"},
	{ id: 341, display: "3533 Oil and gas field machinery"},
	{ id: 342, display: "3534 Elevators and moving stairways"},
	{ id: 343, display: "3535 Conveyors and conveying equipment"},
	{ id: 344, display: "3536 Hoists, cranes, and monorails"},
	{ id: 345, display: "3537 Industrial trucks and tractors"},
	{ id: 346, display: "3541 Machine tools, metal cutting type"},
	{ id: 347, display: "3542 Machine tools, metal forming type"},
	{ id: 348, display: "3543 Industrial patterns"},
	{ id: 349, display: "3544 Special dies, tools, jigs, and fixtures"},
	{ id: 350, display: "3545 Machine tool accessories"},
	{ id: 351, display: "3546 Power-driven handtools"},
	{ id: 352, display: "3547 Rolling mill machinery"},
	{ id: 353, display: "3548 Welding apparatus"},
	{ id: 354, display: "3549 Metalworking machinery, Not Elsewhere Classified"},
	{ id: 355, display: "3552 Textile machinery"},
	{ id: 356, display: "3553 Woodworking machinery"},
	{ id: 357, display: "3554 Paper industries machinery"},
	{ id: 358, display: "3555 Printing trades machinery"},
	{ id: 359, display: "3556 Food products machinery"},
	{ id: 360, display: "3559 Special industry machinery, Not Elsewhere Classified"},
	{ id: 361, display: "3561 Pumps and pumping equipment"},
	{ id: 362, display: "3562 Ball and roller bearings"},
	{ id: 363, display: "3563 Air and gas compressors"},
	{ id: 364, display: "3564 Blowers and fans"},
	{ id: 365, display: "3565 Packaging machinery"},
	{ id: 366, display: "3566 Speed changers, drives, and gears"},
	{ id: 367, display: "3567 Industrial furnaces and ovens"},
	{ id: 368, display: "3568 Power transmission equipment, Not Elsewhere Classified"},
	{ id: 369, display: "3569 General industrial machinery,"},
	{ id: 370, display: "3571 Electronic computers"},
	{ id: 371, display: "3572 Computer storage devices"},
	{ id: 372, display: "3575 Computer terminals"},
	{ id: 373, display: "3577 Computer peripheral equipment, Not Elsewhere Classified"},
	{ id: 374, display: "3578 Calculating and accounting equipment"},
	{ id: 375, display: "3579 Office machines, Not Elsewhere Classified"},
	{ id: 376, display: "3581 Automatic vending machines"},
	{ id: 377, display: "3582 Commercial laundry equipment"},
	{ id: 378, display: "3585 Refrigeration and heating equipment"},
	{ id: 379, display: "3586 Measuring and dispensing pumps"},
	{ id: 380, display: "3589 Service industry machinery, Not Elsewhere Classified"},
	{ id: 381, display: "3592 Carburetors, pistons, rings, valves"},
	{ id: 382, display: "3593 Fluid power cylinders and actuators"},
	{ id: 383, display: "3594 Fluid power pumps and motors"},
	{ id: 384, display: "3596 Scales and balances, except laboratory"},
	{ id: 385, display: "3599 Industrial machinery, Not Elsewhere Classified"},
	{ id: 386, display: "36__ Electronic, Elctrcl Eqpmnt & Cmpnts, Excpt Computer Eqpmnt"},
	{ id: 387, display: "3612 Transformers, except electric"},
	{ id: 388, display: "3613 Switchgear and switchboard apparatus"},
	{ id: 389, display: "3621 Motors and generators"},
	{ id: 390, display: "3624 Carbon and graphite products"},
	{ id: 391, display: "3625 Relays and industrial controls"},
	{ id: 392, display: "3629 Electrical industrial apparatus"},
	{ id: 393, display: "3631 Household cooking equipment"},
	{ id: 394, display: "3632 Household refrigerators and freezers"},
	{ id: 395, display: "3633 Household laundry equipment"},
	{ id: 396, display: "3634 Electric housewares and fans"},
	{ id: 397, display: "3635 Household vacuum cleaners"},
	{ id: 398, display: "3639 Household appliances, Not Elsewhere Classified"},
	{ id: 399, display: "3641 Electric lamps"},
	{ id: 400, display: "3643 Current-carrying wiring devices"},
	{ id: 401, display: "3644 Noncurrent-carrying wiring devices"},
	{ id: 402, display: "3645 Residential lighting fixtures"},
	{ id: 403, display: "3646 Commercial lighting fixtures"},
	{ id: 404, display: "3647 Vehicular lighting equipment"},
	{ id: 405, display: "3648 Lighting equipment, Not Elsewhere Classified"},
	{ id: 406, display: "3651 Household audio and video equipment"},
	{ id: 407, display: "3652 Prerecorded records and tapes"},
	{ id: 408, display: "3661 Telephone and telegraph apparatus"},
	{ id: 409, display: "3663 Radio and t.v. communications equipment"},
	{ id: 410, display: "3669 Communications equipment, Not Elsewhere Classified"},
	{ id: 411, display: "3671 Electron tubes"},
	{ id: 412, display: "3672 Printed circuit boards"},
	{ id: 413, display: "3674 Semiconductors and related devices"},
	{ id: 414, display: "3675 Electronic capacitors"},
	{ id: 415, display: "3676 Electronic resistors"},
	{ id: 416, display: "3677 Electronic coils and transformers"},
	{ id: 417, display: "3678 Electronic connectors"},
	{ id: 418, display: "3679 Electronic components, Not Elsewhere Classified"},
	{ id: 419, display: "3691 Storage batteries"},
	{ id: 420, display: "3692 Primary batteries, dry and wet"},
	{ id: 421, display: "3694 Engine electrical equipment"},
	{ id: 422, display: "3695 Magnetic and optical recording media"},
	{ id: 423, display: "3699 Electrical equipment and supplies, Not Elsewhere Classified"},
	{ id: 424, display: "37__ Transportation Equipment"},
	{ id: 425, display: "3711 Motor vehicles and car bodies"},
	{ id: 426, display: "3713 Truck and bus bodies"},
	{ id: 427, display: "3714 Motor vehicle parts and accessories"},
	{ id: 428, display: "3715 Truck trailers"},
	{ id: 429, display: "3716 Motor homes"},
	{ id: 430, display: "3721 Aircraft"},
	{ id: 431, display: "3724 Aircraft engines and engine parts"},
	{ id: 432, display: "3728 Aircraft parts and equipment, Not Elsewhere Classified"},
	{ id: 433, display: "3731 Shipbuilding and repairing"},
	{ id: 434, display: "3732 Boatbuilding and repairing"},
	{ id: 435, display: "3743 Railroad equipment"},
	{ id: 436, display: "3751 Motorcycles, bicycles, and parts"},
	{ id: 437, display: "3761 Guided missiles and space vehicles"},
	{ id: 438, display: "3764 Space propulsion units and parts"},
	{ id: 439, display: "3769 Space vehicle equipment, Not Elsewhere Classified"},
	{ id: 440, display: "3792 Travel trailers and campers"},
	{ id: 441, display: "3795 Tanks and tank components"},
	{ id: 442, display: "3799 Transportation equipment, Not Elsewhere Classified"},
	{ id: 443, display: "38__ Mesr/Anlyz/Cntrl Instrmnts; Photo/Med/Opt Gds; Watchs/Clocks"},
	{ id: 444, display: "3812 Search and navigation equipment"},
	{ id: 445, display: "3821 Laboratory apparatus and furniture"},
	{ id: 446, display: "3822 Environmental controls"},
	{ id: 447, display: "3823 Process control instruments"},
	{ id: 448, display: "3824 Fluid meters and counting devices"},
	{ id: 449, display: "3825 Instruments to measure electricity"},
	{ id: 450, display: "3826 Analytical instruments"},
	{ id: 451, display: "3827 Optical instruments and lenses"},
	{ id: 452, display: "3829 Measuring and controlling devices, Not Elsewhere Classified"},
	{ id: 453, display: "3841 Surgical and medical instruments"},
	{ id: 454, display: "3842 Surgical appliances and supplies"},
	{ id: 455, display: "3843 Dental equipment and supplies"},
	{ id: 456, display: "3844 X-ray apparatus and tubes"},
	{ id: 457, display: "3845 Electromedical equipment"},
	{ id: 458, display: "3851 Ophthalmic goods"},
	{ id: 459, display: "3861 Photographic equipment and supplies"},
	{ id: 460, display: "3873 Watches, clocks, watchcases, and parts"},
	{ id: 461, display: "39__ Miscellaneous Manufacturing Industries"},
	{ id: 462, display: "3911 Jewelry, precious metal"},
	{ id: 463, display: "3914 Silverware and plated ware"},
	{ id: 464, display: "3915 Jewelers' materials and lapidary work"},
	{ id: 465, display: "3931 Musical instruments"},
	{ id: 466, display: "3942 Dolls and stuffed toys"},
	{ id: 467, display: "3944 Games, toys, and children's vehicles"},
	{ id: 468, display: "3949 Sporting and athletic goods, Not Elsewhere Classified"},
	{ id: 469, display: "3951 Pens and mechanical pencils"},
	{ id: 470, display: "3952 Lead pencils and art goods"},
	{ id: 471, display: "3953 Marking devices"},
	{ id: 472, display: "3955 Carbon paper and inked ribbons"},
	{ id: 473, display: "3961 Costume jewelry"},
	{ id: 474, display: "3965 Fasteners, buttons, needles, and pins"},
	{ id: 475, display: "3991 Brooms and brushes"},
	{ id: 476, display: "3993 Signs and advertising specialties"},
	{ id: 477, display: "3995 Burial caskets"},
	{ id: 478, display: "3996 Hard surface floor coverings, Not Elsewhere Classified"},
	{ id: 479, display: "3999 Manufacturing industries, Not Elsewhere Classified"},
	];
  // defining selectedSicCodeId and its set command    
  const [selectedSicCodeId, setSelectedSicCodeId] = useState([]);

  // defining the businessClassifications array
  const businessClassifications = [
	{ id: 1, display: "ADDITIVE AND 3D"},
	{ id: 2, display: "AEROSPACE AND DEFENSE"},
	{ id: 3, display: "AIRCRAFT AND PARTS"},
	{ id: 4, display: "AIRCRAFT ENGINE PARTS"},
	{ id: 5, display: "AIRCRAFT PARTS & AUX. EQPT"},
	{ id: 6, display: "AIRCRAFT SERVICE AND MAINTENANCE"},
	{ id: 7, display: "ALUMINUM CASTINGS"},
	{ id: 8, display: "ALUMINUM DIE CASTING"},
	{ id: 9, display: "ANALYTICAL INSTRUMENTS"},
	{ id: 10, display: "AUTOMOTIVE STAMPING"},
	{ id: 11, display: "BALL & ROLLER BEARINGS"},
	{ id: 12, display: "CONSTRUCTION MACHINERY"},
	{ id: 13, display: "CONTRACT MFG"},
	{ id: 14, display: "CONVEYORS AND CONVEYING EQUIPMENT"},
	{ id: 15, display: "ELECTRICAL INDUSTRIAL APPARATUS"},
	{ id: 16, display: "ELECTROMEDIAL EQUIPMENT"},
	{ id: 17, display: "ELECTRONIC COMPONENTS & ACC"},
	{ id: 18, display: "ELECTRONICS MANUFACTURING"},
	{ id: 19, display: "FABRICATED STRUCTURAL METAL PRODUCTS"},
	{ id: 20, display: "FARM MACHINERY AND EQUIPMENT"},
	{ id: 21, display: "FASTENERS MFG"},
	{ id: 22, display: "FLUID METERS AND COUNTING DEVICES"},
	{ id: 23, display: "FLUID PUMPS"},
	{ id: 24, display: "INDUSTRIAL CONTROLS AND RELAYS"},
	{ id: 25, display: "INDUSTRIAL FURNACE AND OVEN"},
	{ id: 26, display: "LETTER TEMPLATE"},
	{ id: 27, display: "MACHINE TOOL ACCESSORIES"},
	{ id: 28, display: "MACHINE WORK & MANUFACTURING"},
	{ id: 29, display: "MEASURING AND CONTROLLING DEVICES"},
	{ id: 30, display: "METAL BUILDING PRODUCTS"},
	{ id: 31, display: "METAL CUTTING MACHINE TOOLS"},
	{ id: 32, display: "METAL HEAT TREATING"},
	{ id: 33, display: "METAL STAMPING"},
	{ id: 34, display: "METALWORKING MACHINERY"},
	{ id: 35, display: "MOTOR VEHICLE PARTS"},
	{ id: 36, display: "MOTORS AND GENERATORS"},
	{ id: 37, display: "NONFERROUS METALS"},
	{ id: 38, display: "PACKAGING EQUIPMENT"},
	{ id: 39, display: "PLASTIC PRODUCTS"},
	{ id: 40, display: "PREFAB METAL BUILDINGS"},
	{ id: 41, display: "PUMPS AND PUMPING EQUIPMENT"},
	{ id: 42, display: "RAILROAD EQUIPMENT"},
	{ id: 43, display: "ROBOTICS"},
	{ id: 44, display: "SAW BLADES AND HANDSAW"},
	{ id: 45, display: "SAWMILLS"},
	{ id: 46, display: "SCREW MACHINE PRODUCTS"},
	{ id: 47, display: "SEARCH AND NAVIGATION EQUIPMENT"},
	{ id: 48, display: "SEMICONDUCTOR"},
	{ id: 49, display: "SHIPBUILDING & REPAIR"},
	{ id: 50, display: "STEEL PIPES AND TUBES"},
	{ id: 51, display: "STRUCTURAL METAL"},
	{ id: 52, display: "SURGICAL AND MEDICAL"},
	{ id: 53, display: "TOOL AND DIE"},
	{ id: 54, display: "TRANSFORMERS"},
	{ id: 55, display: "TRUCKS AND TRAILERS"},
	{ id: 56, display: "VALVE AND PIPE FITTINGS"},
	{ id: 57, display: "WELDING APPARATUS"},
	{ id: 58, display: "WOOD PALLETS AND SKIDS"},
	{ id: 59, display: "WOODWORKING MACHINERY"},
	];

  // defining selectedClassificationId and its set command
  const [selectedClassificationId, setSelectedClassificationId] = useState([]);

  // defining the variables to hold smaller text fields to help hanlde change
  const [smallValue, setSmallValue] = useState({
        name: '',
        email: '',
        phone: '',
        whoReferred: '',
        maxPreApproved: '',
        fundsAvailable: '',
        liquidFunds: '',
	desiredPriceRange: '',
	whatPlatformCompany: '',
	whatNameCompany: '',
	whatNameFirm: '',
	companyName: '',
	companyLocation: '',
	companyWebsite: '',
	companyRevenue: ''
  });

  //defining the variable used to handle the resume link and its set command
  const [resumeLink, setResumeLink] = useState();

  // defining potentialBuyerData and its set command
  const [ potentialBuyerData, setPotentialBuyerData]  = useState([]);
	
  // defining the buyerStatuses array
  const buyerStatuses = [
	{ id: 1, display: "NDA Sent"},
	{ id: 2, display: "NDA Signed"},
	{ id: 3, display: "OM Sent"},
	{ id: 4, display: "Financial Qualification"},
	{ id: 5, display: "Data Room Invite Sent"},
	{ id: 6, display: "Buyer-Broker Comm"},
	{ id: 7, display: "Buyer-Seller Comm"},
	{ id: 8, display: "Buyer Plant Visit"},
	{ id: 9, display: "LOI Received"},
	{ id: 10, display: "LOI Signed"},
	{ id: 11, display: "Deal in Due Diligence"},
	{ id: 12, display: "PSA Received"},
	{ id: 13, display: "PSA Signed"},
	{ id: 14, display: "Closing Date Set"},
	{ id: 15, display: "Deal Closed"},
	{ id: 16, display: "Request Received - Exclusionary"},
	{ id: 17, display: "NDA Signed - Exclusionary"},
	{ id: 18, display: "No Longer Interested"},
	{ id: 19, display: "Rejected b/c Finances"},
	{ id: 20, display: "Rejected b/c Experience"}
	];

  // defining the contact types
  const contactTypes = [
	{ id: 1, display: "-None-"},
	{ id: 2, display: "Buyer"},
	{ id: 3, display: "Seller"},
	{ id: 4, display: "Buyer + Seller"},
	{ id: 5, display: "Service Provider"}
	];

  // defining selectedContactTypeId and its set command
  const [selectedContactTypeId, setSelectedContactTypeId] = useState();

  // defining the seller statuses
  const sellerStatuses = [
        { id: 1, display: "-None-"},
        { id: 2, display: "Current Clients"},
        { id: 3, display: "Current Potential CLients"},
        { id: 4, display: "Long Term Potential Clients"},
        { id: 5, display: "Past Clients"},
	{ id: 6, display: "Rejected Clients"}
	];

  // defining selectedSellerStatusId and its set command
  const [selectedSellerStatusId, setSelectedSellerStatusId] = useState();

  // search zoho method
  const searchZoho = async (email) => {
    try {
      // connecting to the proxy server
      const response = await fetch('https://10.1.10.44:5001/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
	
	// passing in the email from the conversation
        body: JSON.stringify({ email }),
      });

      // grabbing the data and storing it the data constant
      const data = await response.json();

      // output the grabbed data for troubleshooting purposes
      // outputs to the console after right clicking and selecting inspect in front
      console.log(data);
     
      // sometimes a second contact is grabbed due to their secondary email
      // this executes if that happens and makes it so that it is only the one needed contact
      if (data.contact.data.length >1)
      {
	// filtering the contact array to find the needed contact
	const primaryContact = data.contact.data.filter(contact => contact.Email === email);
	
	// setting the contact array to the one contact
	data.contact.data = primaryContact;
      }
      
      // store the result in state to display later
      setZohoData(data);
     
      // logic to check if a contact was found
      if (data && data.contact.data && data.contact.data.length >0 && data.contact.data[0].Full_Name){
	setIsContactFound(true);
      }else{
	setIsContactFound(false);
      }

    // catch that executes if there is an error searching zoho
    } catch (error) {
      console.error('Error searching Zoho:', error);
      setIsContactFound(false);
    }finally{
      setIsLoading(false);
    }
  };

  // allowing access to grab the email from front
  const context = useFrontContext();
  // grabbing and storing the email from front
  const recipientEmail = (context.conversation && context.conversation.recipient && context.conversation.recipient.handle) ? context.conversation.recipient.handle : 'TEST';
  // printing the email to the inpsect console for troubleshooting purposes
  console.log(recipientEmail);

  console.log(selectedContactTypeId);

  // calling the searchZoho method with the email
  useEffect(() => {
	searchZoho(recipientEmail);
  }, []);
  

 // splitValueIntoLines function
 // takes in a large line of text and a max length to format it to wrap text
 const splitValueIntoLines = (value, maxLength) => {
   // defining a lines array and a start coutner
   const lines = [];
   let start = 0;
   let numLines = 1;

   if (value != null)
   {   
     // loop that runs through the entire length of the text
     while (start < value.length) {
      	  // calculating the end
	  let end = start + maxLength;
	
	  // this condition prevents an "out-of-bounds" error by ensuring the function only slices up to the actual text length
	  if (end >= value.length){
		  lines.push(value.substring(start));
		  break;
	  }

	  // defines last space index so words are not split 
	  let lastSpaceIndex = value.lastIndexOf(' ', end);

	  // if no space is found  split at 'end'
	  if (lastSpaceIndex === -1){
		lastSpaceIndex = end;
	  }

	  // push the substring from start to the last space (or 'end' if no space found)
	  lines.push(value.substring(start, lastSpaceIndex));

	  // update the start position for the line after the last space
	  start = lastSpaceIndex  +1;
     }

     // loop through the lines array (except first one) to add indentation for formatting
     for ( let i =1; i< lines.length; i++){
	// add tabs to the beginning of each line
	lines[i] = '\t\t\t\t' + lines[i];
     }
   
     // return the array of formatted lines
     if (lines != null)
     {
	numLines = lines.length;
     }
     return numLines;
  }
 };

 // formatPhoneNumber function
 // used to formate phone numbers so they appear correctly
 const formatPhoneNumber = (value) => {
   // checks to make sure a value is passed
   if (!value){
	// returns blank if value is empty
	return "";
   }else{
	// converts the raw number to an array
	const number = Array.from(value);
	// loops through the number array
	for (let i  = 0; i < number.length; i++) {
	   // adds opening parenthesis to the front of the first number
	   if (i === 0){
		number[i] = '(' + number[i];
	   // adds closing parenthesis and space to the end of the third number
	   } else if (i === 2) {
		number[i] = number[i] + ') ';
	   // adds a dash after the 6th number
	   } else if (i === 5) {
		number[i] = number[i] + '-';
	   }
	 } 
	 // returns the joined array
 	 return number.join('');
   }
 };

 // formatLocation function
 // used to return a city and state as one separated by a comma
 const formatLocation = (value1, value2) => {
  // checks to make sure both values are passed
  if (!value1 || !value2){
	// returns black if either value is empty
	return "";
  }else{
	// creates the output and returns it
	const output = value1 + ', ' + value2;
	return output;
  }
 }

 // formatRevenue function
 // used to add a dollar sign in front of the revenue
 const formatRevenue = () => {
   // by default assumes no revenue 
   let output = "";
   // checks to see if there is a prospectiveSeller profile
   if (zohoData != null && zohoData.prosepctiveSeller != null && zohoData.prospectiveSeller.data[0].Annual_Sales_Revenue != null)
   {
	// creates the output
 	output = "$" + zohoData.prospectiveSeller.data[0].Annual_Sales_Revenue;
   }
   // returns the output
   return output;
 }

 useEffect(() => {
    // checks if zohoData exist
    if (zohoData != null)
    {
	//grabs the selected area
	const defaultSelectedAreas = zohoData.contact.data[0].Desired_Geographic_Area;

        // Match fetched areas to geographicAreas by their "display" property
        const matchedIds = geographicAreas
          .filter((area) =>
            defaultSelectedAreas.some((zohoArea) =>
              area.display.includes(zohoArea) // Check if display contains the area name/code
            )
          )
          .map((area) => area.id);
	//set selected area
        setSelectedAreaIds(matchedIds);
    }
 }, [zohoData]);

 useEffect(() => {
   // checks if zohoData exist
   if (zohoData != null)
   {
	// sets id equal to 1
	let id = 1;
	// grabs the financing needed
        const financing = zohoData.contact.data[0].Financing_Needed1;
        // checks all possible options for financing and sets the needed id number
	if (financing === "YES, I'M PRE-APPROVED")
        {
             id = 2;
        }
        else if (financing === "YES, BUT NEED HELP FINDING FINANCING")
        {
             id = 3;
        }
        else if (financing === "NO, I'M GOOD TO GO")
        {
             id = 4;
        }
	// sets the final id numebr to the selected
        setSelectedItemId(id);
   }
 }, [zohoData]);

 useEffect(() => {
   // checks if zohoData exist
   if (zohoData != null)
   {
	// sets the long text values to the grabbed value or empty
	setTextValue({
		manufacturingBusiness: zohoData.contact.data[0].Manufacturing_business_you_re_looking_for || '',
	        geographicArea: zohoData.contact.data[0].Geographic_area_that_works_for_you || '',   
		workExperience: zohoData.contact.data[0].Work_experience_skill_set || '',
		desiredRole: zohoData.contact.data[0].Desired_Role_in_company_after_purchase || '',
		involvementType: zohoData.contact.data[0].What_type_of_involvement_you_see_yourself_as_an_ow || '',
		industryExperience: zohoData.contact.data[0].Describe_your_industry_experience || '',
		comments: zohoData.contact.data[0].Comments || ''
	});
   }
 }, [zohoData]);

 useEffect(() => {
   // checks if zohoData exist
   if (zohoData != null)        
   {
	// sets id equal to 1 
        let id = 1;
	//grabs the method of contact
        const method = zohoData.contact.data[0].Preferred_Method_of_Contact;
	// checks all possible options for method of contact and sets the needed id number
        if (method === "Email")
        {
             id = 2;
        }
        else if (method === "Phone")
        {
             id = 3;
        }
	// sets the final id number to the selected
        setSelectedMethodId(id);
   }
 }, [zohoData]);

  useEffect(() => {
   // checks if zohoData exist
   if (zohoData != null)
   {
	// sets id equal to 1
	let id = 1;
	// grabs the listing alert option
	const listAlert = zohoData.contact.data[0].Listing_Alert;
	// checks all possible options for method of contact and sets the needed id number
	if (listAlert === "Yes")
	{
		id = 2;
	}
	else if (listAlert === "No")
	{
		id = 3;
	}
	// sets the final id number to the selected
	setSelectedListingAlertId(id);
    }
  }, [zohoData]);

  useEffect(() => {
   // checks if zohoData exist
   if (zohoData != null)
   {
	// sets id equal to 0
	let id = 1;
	// grabs the type of buyer
	const type = zohoData.contact.data[0].What_type_of_buyer_are_you;
	// runs through each buyer type
	for (let i = 1; i < buyerType.length; i++)
	{
		// if the buyer type is found, sets the id number and stops the loop
		if (type === buyerType[i].display)
		{
			id = i+1;
			break;
		}
	}
        // sets the final id number to the selected
        setSelectedBuyerTypeId(id);
     
   }
 }, [zohoData]);

  useEffect(() => {
    // checks if zohoData exist
    if (zohoData != null)
    {
	// grabs hgow the user heard about us
        const defaultHeardAboutUs = zohoData.contact.data[0].How_did_you_hear_about_us;
        // grabs the matched ids (can be more than one)
        const matchedIds = heardAboutUs
          .filter((heard) =>
            defaultHeardAboutUs.some((zohoHeard) =>
              heard.display.includes(zohoHeard) // Check if display contains the area name/code
            )
          )
          .map((heard) => heard.id);
        // sets the final id numbers to the selected
        setSelectedHeardAboutUsId(matchedIds);
    }
 }, [zohoData]);

  useEffect(() => {
    // checks if zohoData exist
    if (zohoData != null)
    {
	// grabs the sic codes selected
        const defaultSicCodes = zohoData.contact.data[0].Select_desired_manufacturing_sectors_by_SIC_Code;
        // grabs the matched codes ids        
        const matchedIds = sicCodes
          .filter((codes) =>
            defaultSicCodes.some((zohoCodes) =>
              codes.display.includes(zohoCodes) // Check if display contains the area name/code
            )      
          )
          .map((codes) => codes.id);
        // sets the final id numbers to the selected
        setSelectedSicCodeId(matchedIds);
    }
 }, [zohoData]);

 useEffect(() => {
    // checks if zohoData exist
    if (zohoData != null)
    {
	// grabs the selected business classification
        const defaultClassification = zohoData.contact.data[0].Business_Classification;
        // grasb the matched classification ids
        const matchedIds = businessClassifications
          .filter((bClassifications) =>
            defaultClassification.some((zohoBClassifications) =>
              bClassifications.display.includes(zohoBClassifications) // Check if display contains the area name/code
            )
          )
          .map((bClassifications) => bClassifications.id);
 	// sets the final id numbers to the selected
        setSelectedClassificationId(matchedIds);
    }
 }, [zohoData]);

  useEffect(() => {
   // checks if zohoData exist
   if (zohoData != null)
   {
	// sets the small text values to the grabbed value or empy
        setSmallValue({
		name: zohoData.contact.data[0].Full_Name || '',
	        email: zohoData.contact.data[0].Email || '',
	        phone: formatPhoneNumber(zohoData.contact.data[0].Mobile) || '',
	        whoReferred: zohoData.contact.data[0].Who_referred || '',
	        maxPreApproved: zohoData.contact.data[0].Maximum_amount_for_which_you_ve_been_pre_approved || '',
	        fundsAvailable: zohoData.contact.data[0].Funds_Available || '',
	        liquidFunds: zohoData.contact.data[0].What_liquid_funds_do_you_have_available || '',
	        desiredPriceRange: zohoData.contact.data[0].Desired_Price_Range || '',
	        whatPlatformCompany: zohoData.contact.data[0].What_is_the_name_of_the_platform_company || '',
	        whatNameCompany: zohoData.contact.data[0].What_is_the_name_of_your_company || '',
	        whatNameFirm: zohoData.contact.data[0].What_is_the_name_of_your_firm || '',
	        companyName: zohoData.account.data[0].Account_Name || '',
	        companyLocation: formatLocation(zohoData.account.data[0].Billing_City, zohoData.account.data[0].Billing_State) || '',
	        companyWebsite: zohoData.account.data[0].Website || '',
	        companyRevenue: formatRevenue() || ''
        });
   }
 }, [zohoData]);
 
 useEffect(() => {
	// checks to make sure there is a potential buyer
	if (zohoData!= null && zohoData.potentialBuyer !== '')
	{
		// creates a temporary potential buyer array
		const tempPotBuyer = [];
	        // gets the number of deals
	        const numDeals = zohoData.potentialBuyer.info.count;
		// adds the deals info the temporary array
		for (let i = 1; i <= numDeals; i++)
		{
			tempPotBuyer.push({ id: `${i}`,
						 title: `Potential Buyer #${i}`,
						 companyName: zohoData.potentialBuyer.data[i-1].Related_Deal.name || '',
						 buyerStatus: zohoData.potentialBuyer.data[i-1].Buyer_Status || ''
						}); 
		} 	
		// updates the array with the information
		setPotentialBuyerData(tempPotBuyer);
	}else {
		// sets it to empty
		setPotentialBuyerData([]);
	}
 }, [zohoData]); 

 // handleInputChange function
 // handles the change of text input in the potential buyer section
 const handleInputChange = (id, value) => {
    setPotentialBuyerData((prevData) =>
        prevData.map((item) =>
            item.id === id ? { ...item, companyName: value } : item
        )
    );
 };

 // handleSelectChange function
 // handles the change of dropdown input in the potential buyer section
 const handleSelectChange = (id, value) => {
    setPotentialBuyerData((prevData) =>
        prevData.map((item) =>
            item.id === id ? { ...item, buyerStatus: value } : item
        )
    );
 };

 useEffect(() => {
	// checks to see if zohoData is null and if there is a resume
	if (zohoData != null && zohoData.contact.data[0].Resume != null)
	{
		// creates the resume download link
		setResumeLink("https://crm.zoho.com" + zohoData.contact.data[0].Resume[0].download_Url);	
	} else {
		// creates a blank link that does nothing but acts as a place holder
		setResumeLink("");
	}
 }, [zohoData]);	

   useEffect(() => {
   // checks if zohoData exist
   if (zohoData != null)
   {
        // sets id equal to 1
        let id = 1;
        // grabs the type of contact
        const type = zohoData.contact.data[0].Contact_Type;
        // runs through each contact type
        for (let i = 1; i < contactTypes.length; i++)
        {
                // if the contact type is found, sets the id number and stops the loop
                if (type === contactTypes[i].display)
                {
                        id = i+1;
                        break;
                }
        }
        // sets the final id number to the selected
        setSelectedContactTypeId(id);
   }
 }, [zohoData]);

   useEffect(() => {
   // checks if zohoData exist
   if (zohoData != null)
   {
        // sets id equal to 1
        let id = 1;
        // grabs the seller status
        const status = zohoData.contact.data[0].Seller_Status;
        // runs through each status
        for (let i = 1; i < sellerStatuses.length; i++)
        {
                // if the status is found, sets the id number and stops the loop
                if (status === sellerStatuses[i].display)
                {
                        id = i+1;
                        break;
                }
        }
        // sets the final id number to the selected
        setSelectedSellerStatusId(id);

   }
 }, [zohoData]);

  // return statement for everything outputted to the screen
  return (
     	<div>
      	  {isLoading ? (
        	<p>Loading...</p>
      	  ) : isContactFound ? (
          <div style={{ width: '400px', border: '2px solid #bdbdbd', margin: '10px', padding: '10px', borderRadius: '10px', textAlign: 'left', maxWidth: '600px' }}>
	  <Heading size="extra-large">Contact Information </Heading>
          <Heading size="small" color="grey">Contact Type </Heading>
	  <Select
                selectedValues={contactTypes.find((item) => item.id === selectedContactTypeId)?.display}
                layerRootId="story--components-select--basic">
                {contactTypes.map((item) => (
                   <SelectItem
                        key={item.id}
                        onClick={() => setSelectedContactTypeId(item.id)}
                        isSelected={item.id === selectedContactTypeId}>
                        {item.display}
                   </SelectItem>
                 ))}
          </Select>
          <Heading size="small" color="grey">Seller Status </Heading>
          <Select
		isDisabled = {(selectedContactTypeId !== 3 && selectedContactTypeId !== 4)}
                selectedValues={sellerStatuses.find((item) => item.id === selectedSellerStatusId)?.display}
                layerRootId="story--components-select--basic">
                {sellerStatuses.map((item) => (
                   <SelectItem
                        key={item.id}
                        onClick={() => setSelectedSellerStatusId(item.id)}
                        isSelected={item.id === selectedSellerStatusId}>
                        {item.display}
                   </SelectItem>
                 ))}
          </Select>
          <FormField label="Name">
            <Input value={smallValue.name} onChange={setSmallValue} />
          </FormField>
	  <FormField label="Email">
            <Input value={smallValue.email} onChange={setSmallValue} />
          </FormField>
	  <FormField label="Phone">
            <Input value={smallValue.phone} onChange={setSmallValue} />
          </FormField>
	  <div style={{ margin: '10px', padding: '5px' }} hidden={!(selectedContactTypeId === 1 || selectedContactTypeId === 2 || selectedContactTypeId === 4)}>
		  <Heading>Buyer Registration: </Heading>
                  <Heading size="small" color="grey">How did you hear about us? </Heading>
                  <Select
                    selectedValues={selectedHeardAboutUsId.map((id) => heardAboutUs.find((i) => i.id === id)?.display)
                        .filter(Boolean)}
                    layerRootId="story--components-select--multi">
                    {heardAboutUs.map((item) => (
                        <SelectItem
                          key={item.id}
                          type="multi"
                          isSelected={selectedHeardAboutUsId.includes(item.id)}
                          onClick={() =>
                           setSelectedHeardAboutUsId((itemIds) => {
                             if (itemIds?.includes(item.id)) return itemIds.filter((id) => id !== item.id);
                                return [...itemIds, item.id];
                             })
                           }>
                           {item.display}
                        </SelectItem>
                     ))}   
                  </Select>
		  <FormField label="Who referred?">
	            <Input value={smallValue.whoReferred} onChange={setSmallValue} />
	          </FormField>
		  <Heading size="small" color="grey">Manufacturing business you're looking for: </Heading>
                  <Textarea value={textValue.manufacturingBusiness} onChange={(e) => handleChange('manufactuirngBusiness', e.target.value)} rows={10}  />
                  <Heading size="small" color="grey">Geographic area that works for you: </Heading>
                  <Textarea value={textValue.geographicArea} onChange={(e) => handleChange('geographicArea', e.target.value)} rows={10} />
		  <Heading size="small" color="grey">Desired geographic area: </Heading>
		  <Select
		    selectedValues={selectedAreaIds.map((id) => geographicAreas.find((i) => i.id === id)?.display)
			.filter(Boolean)}
		    layerRootId="story--components-select--multi">
		    {geographicAreas.map((item) => (
			<SelectItem
			  key={item.id}
			  type="multi"
			  isSelected={selectedAreaIds.includes(item.id)}
			  onClick={() =>
			   setSelectedAreaIds((itemIds) => {
			     if (itemIds?.includes(item.id)) return itemIds.filter((id) => id !== item.id);
				return [...itemIds, item.id];
			     })
			   }>
			   {item.display}
			</SelectItem>
		     ))}
		  </Select>
                  <Heading size="small" color="grey">Financing Needed </Heading>
		  <Select
			placeholder="Financing Needed"
			selectedValues={items.find((item) => item.id === selectedItemId)?.display}
			layerRootId="story--components-select--basic">
			{items.map((item) => (
			    <SelectItem
				key={item.id}
				onClick={() => setSelectedItemId(item.id)}
				isSelected={item.id === selectedItemId}>
				{item.display}
			    </SelectItem>
			 ))}
		  </Select>
		  <FormField label="Maximum amount for which you've been pre-approved">
	            <Input value={smallValue.maxPreApproved} onChange={setSmallValue} />
	          </FormField>
		  <FormField label="Funds available">
	            <Input value={smallValue.fundsAvailable} onChange={setSmallValue} />
	          </FormField>
                  <Heading size="small" color="grey">Work experience & skill set </Heading>
                  <Textarea value={textValue.workExperience} onChange={(e) => handleChange('workExperience', e.target.value)} rows={10} />
                  <Heading size="small" color="grey">Desired role in company after purchase: </Heading>
                  <Textarea value={textValue.desiredRole} onChange={(e) => handleChange('desiredRole', e.target.value)} rows={10} />
                  <FormField label="What liquid funds do you have available?">               
                    <Input value={smallValue.liquidFunds} onChange={setSmallValue} />
                  </FormField>
		  <Heading size="small" color="grey">Preferred method of contact: </Heading>
		  <Select
                        selectedValues={contactMethod.find((item) => item.id === selectedMethodId)?.display}
                        layerRootId="story--components-select--basic">
                        {contactMethod.map((item) => (
                            <SelectItem
                                key={item.id}
                                onClick={() => setSelectedMethodId(item.id)}
                                isSelected={item.id === selectedMethodId}>
                                {item.display}
                            </SelectItem>
                         ))}
		  </Select>
		  <Heading size="small" color="grey">Select desired manufacturing sectors by SIC code: </Heading>
                  <Select
                    selectedValues={selectedSicCodeId.map((id) => sicCodes.find((i) => i.id === id)?.display)
                        .filter(Boolean)}
                    layerRootId="story--components-select--multi">
                    {sicCodes.map((item) => (
                        <SelectItem
                          key={item.id}
                          type="multi"
                          isSelected={selectedSicCodeId.includes(item.id)}
                          onClick={() =>
                           setSelectedSicCodeId((itemIds) => {
                             if (itemIds?.includes(item.id)) return itemIds.filter((id) => id !== item.id); 
                                return [...itemIds, item.id];
                             })
                           }>
                           {item.display}
                        </SelectItem>
                     ))}
                  </Select>	
                  <FormField label="Desired price range:">
                    <Input value={smallValue.desiredPriceRange} onChange={setSmallValue} />
                  </FormField>
                  <Heading size="small" color="grey">What type of buyer are you? </Heading>
                  <Select
                        selectedValues={buyerType.find((item) => item.id === selectedBuyerTypeId)?.display}
                        layerRootId="story--components-select--basic">
                        {buyerType.map((item) => (
                            <SelectItem
                                key={item.id}
                                onClick={() => setSelectedBuyerTypeId(item.id)}
                                isSelected={item.id === selectedBuyerTypeId}>
                                {item.display}
                            </SelectItem>
                         ))}
                  </Select>
                  <Heading size="small" color="grey">What type of involvement you see yourself as owner: </Heading>
                  <Textarea value={textValue.involvementType} onChange={(e) => handleChange('involvementType', e.target.value)} rows={10} />
                  <Heading size="small" color="grey">Describe your industry experience: </Heading>
                  <Textarea value={textValue.industryExperience} onChange={(e) => handleChange('industryExperience', e.target.value)} rows={10} />
                  <FormField label="What is the name of the platform company?">
                    <Input value={smallValue.whatPlatformCompany} onChange={setSmallValue}/>
                  </FormField>
                  <FormField label="What is the name of your company?">                                  
                    <Input value={smallValue.whatNameCompany} onChange={setSmallValue} />
                  </FormField>
                  <FormField label="What is the name of your firm?">                                  
                    <Input value={smallValue.whatNameFirm} onChange={setSmallValue} />
                  </FormField>
		  <Heading size="small" color="grey">Resume: </Heading>
		  <button
			  style={{
				backgroundColor: 'white',  // White background
				border: '2px solid black',  // Black border
				padding: '7px 14px',  // Padding to make the button bigger
				textAlign: 'center',  // Center text inside the button
				cursor: 'pointer',  // Make the cursor look clickable
				display: 'inline-block',  // Ensure it's treated like a button
				borderRadius: '5px',  // Rounded corners
				transition: 'all 0.3s ease',  // Smooth transition for hover effects
			  }}
			>
			  <a 
				href={resumeLink} 
				download
				style={{
      					color: 'black',  // Black text
      					textDecoration: 'none',  // Remove underline
      					fontSize: '16px',  // Font size
      					fontWeight: 'bold',  // Bold text
			        }}
			  >
				Download Resume
			  </a>
		  </button>
                  <Heading size="small" color="grey">Listing Alert: </Heading>
		  <Select
		    searchValue=""
		    selectedValues={listingAlert.find((item) => item.id === selectedListingAlertId)?.display}
		    layerRootId="story--components-select--basic">
		    {listingAlert.map((item) => (
			<SelectItem
			   key={item.id}
			   onClick={() => setSelectedListingAlertId(item.id)}
			   isSelected={item.id === selectedListingAlertId}>
			   {item.display}
			</SelectItem>
		    ))}
		  </Select>
                  <Heading size="small" color="grey">Comments: </Heading>
                  <Textarea value={textValue.comments} onChange={setTextValue} rows={10}  />
                  <Heading size="small" color="grey">Business Classificaiton </Heading>
                  <Select
                    selectedValues={selectedClassificationId.map((id) => businessClassifications.find((i) => i.id === id)?.display)
                        .filter(Boolean)}
                    layerRootId="story--components-select--multi">
                    {businessClassifications.map((item) => (
                        <SelectItem
                          key={item.id}
                          type="multi"
                          isSelected={selectedClassificationId.includes(item.id)}
                          onClick={() =>
                           setSelectedClassificationId((itemIds) => {
                             if (itemIds?.includes(item.id)) return itemIds.filter((id) => id !== item.id);  
                                return [...itemIds, item.id];
                             })
                           }>
                           {item.display}
                        </SelectItem>
                     ))}
                  </Select>
              </div>
	      <Heading size="extra-large">Account Information </Heading>
	      <FormField label="Company Name:">
                    <Input value={smallValue.companyName} onChange={setSmallValue}/>
              </FormField>
	      <FormField label="Company Location:">
                    <Input value={smallValue.companyLocation} onChange={setSmallValue}/>
              </FormField>
	      <FormField label="Company Website:">
                    <Input value={smallValue.companyWebsite} onChange={setSmallValue}/>
              </FormField>
	      <FormField label="Company Revenue:">
                    <Input value={smallValue.companyRevenue} onChange={setSmallValue}/>
              </FormField>
	      <Heading size="extra-large">Potential Buyer Information </Heading>
	      <Accordion>
  		{potentialBuyerData.map((section) => (
    		      <AccordionSection
      		        key={section.id}
      		        id={section.id}
      		        title={section.title}>
		        <div>
		         <FormField label="Company Name:">
		            <Input value = {section.companyName || ''} onChange={(newValue) => handleInputChange(section.id, newValue)}/>
        		 </FormField>
			 <Heading size="small" color="grey">Buyer Status: </Heading>
		         <Select
			    selectedValues={buyerStatuses.find((item) => item.display === section.buyerStatus)?.display}
			    layerRootId="story--components--basic">
			    {buyerStatuses.map((item) => (
				<SelectItem
				   onClick={() => handleSelectChange(section.id, item.display)}
				   key={item.id}>
				   {item.display}
				</SelectItem>
			    ))}
       			 </Select>
		       </div>
		    </AccordionSection>
 		 ))}
	      </Accordion>
            </div>
         ) : (
             <p>No contact found</p>
         )}
         </div>
      );
  };
        
export default Tutorial;
