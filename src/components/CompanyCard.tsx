// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';


// interface CompanyCardProps {
//   companyId: string;
//   token: string;
// }

// export const CompanyCard: React.FC<CompanyCardProps> = observer(
//   ({ companyId, token }: CompanyCardProps) => {

//     return (
//       <div className="company-card">
//         {editMode ? (
//           <div className="company-card__edit">
//             <label>
//               Название:
//               <input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Краткое название:
//               <input
//                 name="shortName"
//                 value={formData.shortName}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Тип организации:
//               <input
//                 name="businessEntity"
//                 value={formData.businessEntity}
//                 onChange={handleChange}
//               />
//             </label>
//             <div className="company-card__buttons">
//               <button onClick={handleSave}>Сохранить</button>
//               <button onClick={() => setEditMode(false)}>Отмена</button>
//             </div>
//           </div>
//         ) : (
//           <div className="company-card__view">
//             <h2>{companyStore.company.name}</h2>
//             <p>
//               <strong>Краткое название:</strong>{' '}
//               {companyStore.company.shortName}
//             </p>
//             <p>
//               <strong>Тип организации:</strong>{' '}
//               {companyStore.company.businessEntity}
//             </p>
//             <button onClick={() => setEditMode(true)}>Редактировать</button>
//           </div>
//         )}
//       </div>
//     );
//   }
// );
