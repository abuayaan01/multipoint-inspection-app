import Dexie from "dexie";

export const db = new Dexie("Inspection");
db.version(7).stores({
  General:
    "++id, name,number,address,bathroom,room,basement,crawlSpace,garageType",
  PropertyDetails:
    // "++id, type, style , size , yearBuilt , salePrice , scopeOfInspection , mainEntranceFaces , stateOfOccupancy , weatherCondition , recentRain", // Primary key and indexed props
    "++id, propertyDetails", // Primary key and indexed props
  RelatedContacts: "++id, contacts", // Primary key and indexed props
});

export async function GetAllData() {
  return await db.General.toArray();
}

export async function GetDataById(id) {
  const Uid = parseInt(id);
  const objectStores = db.tables.map(table => table.name);

  const promises = objectStores.map(async storeName => {
    const data = await db[storeName].where('id').equals(Uid).toArray();
    return { [storeName]: data };
  });

  const results = await Promise.all(promises);
  return results;
}
