const BASE_URL = 'https://restcountries.com/v3.1/'


export const getAllCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
}

export const getCountryByName = async (name) => {
    if (!name) return [];
  try {
    const response = await fetch(BASE_URL + "name/" + name);
    if (!response.ok) throw new Error("Search not found");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCountriesByRegion = async (region) => {
    try {
        const response = await fetch(BASE_URL + "region/" + region);
        if (!response.ok) throw new Error("Region not found");
        return await response.json();
    }catch (error){
        console.log(error)
    }
}

export const getCountryByCode = async (code) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!response.ok) {
      throw new Error('Error fetching country by code');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};



