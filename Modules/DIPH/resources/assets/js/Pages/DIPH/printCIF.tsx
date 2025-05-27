import React, { useRef } from 'react';
import { usePage } from '@inertiajs/react';
import html2pdf from 'html2pdf.js';
import { Checkbox } from '@/components/ui/checkbox';

const PrintCIF = () => {
  const { props } = usePage();
  const diph = props.diph;
  const patient = diph?.patient;
  const city = props.city;
  const province = props.province;
  const permcity = props.permcity;
  const permprovince = props.permprovince;

  const barangays = [
    { label: 'Bao', value: 1204701001 },
    { label: 'Barangiran', value: 1204701002 },
    { label: 'Camansi', value: 1204701003 },
    { label: 'Dado', value: 1204701004 },
    { label: 'Guiling', value: 1204701005 },
  ];
  const barangay = barangays.find((bar) => { if(Number(patient.pat_address_brgy) === bar.value) return bar.label });

  const permbarangay = barangays.find((bar) => { if(Number(patient.pat_perm_address_brgy) === bar.value) return bar.label });

  const contentRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = () => {
    if (contentRef.current) {
      html2pdf()
        .from(contentRef.current)
        .set({
          margin: 10,
          filename: 'diphtheria-case-form.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .save();
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleGeneratePDF}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>

      <div
        ref={contentRef}
        className="bg-white p-10 max-w-[210mm] min-h-[297mm] mx-auto text-black text-[10pt] font-[Arial] border"
      >
        <div className="grid grid-cols-3 items-center mb-2">
          <div className="flex items-center gap-1">
            <img src="/images/pidsr-logo.png" alt="PIDSR Logo" className="w-[60px] h-[60px]" />
            <div className="leading-tight text-[9pt]">
              <p className="font-bold">Philippine Integrated Disease</p>
              <p className="font-bold">Surveillance and Response</p>
            </div>
          </div>

          <div className="text-center leading-tight">
            <h2 className="text-[12pt] leading-none">Case Investigation Form</h2>
            <h3 className="text-[13pt] font-[Arial Black] font-bold leading-none">Diphtheria</h3>
            <p className="text-[11pt] leading-none">(ICD 10 Code: A36)</p>
          </div>

          <div className="flex flex-col items-end text-right">
            <p className="text-[9pt] font-bold">Version 2019</p>
            <img src="/images/doh-icon.png" alt="Form Icon" className="w-[60px] h-[60px] mt-0" />
          </div>
        </div>

        <div className="border border-black p-0 mb-0">
          <div className="grid grid-cols-3 text-[9pt]">
            <div className="col-span-1 pr-4 border-r border-black">
              <p className="mb-2">Name of DRU:</p>
              <p>DRU Complete Address:</p>
            </div>
            <div className="col-span-2 pl-4">
              <p>Type:</p>
              <p className="mt-1">
                ☐ RHU/CHO &nbsp;&nbsp; ☐ Gov’t Hospital &nbsp;&nbsp; ☐ Private Hospital &nbsp;&nbsp; ☐ Clinic &nbsp;&nbsp; <br />
                ☐ Gov’t Laboratory &nbsp;&nbsp; ☐ Private Laboratory &nbsp;&nbsp; ☐ Airport/Seaport
              </p>
            </div>
          </div>
        </div>

        <div className="border-r border-l border-black">
          <h3 className="font-bold bg-gray-100 p-1 border-b border-black">A. PATIENT INFORMATION</h3>
          <div className="grid grid-cols-5 text-[9pt] border-b border-black">
            <p className="border-r border-black">Patient Number: {diph?.patient_number}</p>
            <p className="bg-gray-100 border-r border-black">EPI ID: {diph?.epi_id}</p>
            <p>First Name: <br></br> {patient?.firstname}</p>
            <p>Middle Name: <br></br> {patient?.middlename}</p>
            <p>Last Name: <br></br> {patient?.lastname}</p>
          </div>
          <div className="grid grid-cols-6 text-[9pt] border-b border-black">
            <div className="col-span-2 pr-4 border-r border-black">
              <p className="mb-2 mt-4">Current Address: <br/>
              {patient.pat_address_street_name}, {barangay.label}, {city.city_name}, {province.province_name}</p>
              <p>Permanent Address:</p>
              {patient.pat_perm_address_street_name}, {permbarangay.label}, {permcity.city_name}, {permprovince.province_name}
            </div>
            <div className="col-span-2 pl-1 border-r border-black">
              <p>Sex: {patient.sex === 'M' ? '☑' : '☐'} Male &nbsp;&nbsp; {patient.sex === 'F' ? '☑' : '☐'} Female</p>

              <p>Pregnant? ☐ Y &nbsp;&nbsp; ☐ N &nbsp;&nbsp; ☐ U</p>
              <p>If yes, weeks of pregnancy _______________________________</p>
              <p>Civil Status: ___________________</p>
            </div>
            <div className="col-span-1 text-center pr-2 border-r border-black">
              <p className="mb-2 mt-4">Date of Birth:</p>
              <p>&nbsp;&nbsp;MM&nbsp;&nbsp;DD &nbsp;&nbsp;YYYY</p>
              <p>{patient?.dateofbirth ? new Date(patient.dateofbirth).toLocaleDateString('en-US') : ''}</p>
            </div>
            <div className="col-span-1 text-center pr-4">
              <p className="mb-2 mt-2 ml-1">Age: {patient?.ageinyears} y.o.</p>
              <p><p className='ml-2 border-solid border-3 w-6 h-6'>{patient?.ageindays}&nbsp;&nbsp;&nbsp;Days</p> <br /> <p className='ml-2 border-solid border-3 w-6 h-6'>{patient?.ageinmonths}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Months</p> <br /> <p className='ml-2 border-solid border-3 w-6 h-6'>{patient?.ageinyears}&nbsp;&nbsp;&nbsp;Years</p></p>
              <p></p>
            </div>
          </div>

          <div className="grid grid-cols-6 text-[9pt] border-b border-black">
            <div className="col-span-2 pr-2 border-r border-black">
              <p>Occupation: {patient?.occupation}</p>
              <p>Phone: {patient?.phone_no}</p>
            </div>
            <div className="col-span-4 border-r border-black">
              <div className="grid grid-cols-4">
                <div className="col-span-2 border-r border-black">
                  Patient Admitted? {diph?.admitted === 'Y' ? '☑' : '☐'} Y &nbsp;&nbsp; {diph?.admitted === 'N' ? '☑' : '☐'} N</div>
                <div className="col-span-1 border-r border-black">Date Admitted/ Seen/Consult</div>
                <div className="grid grid-cols-3 text-center">
                  {diph?.date_admitted ? new Date(diph?.date_admitted).toLocaleDateString('en-US') : (<><div className="col-span-1">MM</div>
                    <div className="col-span-1">DD</div>
                    <div className="col-span-1">YYYY</div></>)}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 text-[9pt] border-b border-black">
            <div className="col-span-3 pr-2 border-r border-black">
              <p>Name of parent/caregiver: {diph?.caregiver}</p>
            </div>
            <div className="col-span-4 pr-2 border-r border-black">
              <p>Contact No: {diph?.caregiver_no}</p>
            </div>
          </div>

          <div className="grid grid-cols-7 text-[9pt] border-b border-black">
            <div className="col-span-2 border-r border-black">
              <div className="grid grid-cols-5 text-center">
                <div className="col-span-2">Date of Report</div>
                {diph?.date_report ? new Date(diph?.date_report).toLocaleDateString('en-US') : (<><div className="col-span-1">MM</div>
                  <div className="col-span-1">DD</div>
                  <div className="col-span-1">YYYY</div></>)}
              </div>
            </div>
            <div className="col-span-3 pr-2 border-r border-black">
              <p>Name of Reporter: {diph?.reporter}</p>
            </div>
            <div className="col-span-2 pr-2 border-r border-black">
              <p>Contact No: {diph?.reporter_no}</p>
            </div>
          </div>

          <div className="grid grid-cols-7 text-[9pt] border-b border-black">
            <div className="col-span-2 border-r border-black">
              <div className="grid grid-cols-5">
                <div className="col-span-2">Date of Investigation</div>

                {diph?.date_investigation ? new Date(diph?.date_investigation).toLocaleDateString('en-US') : (<><div className="col-span-1">MM</div>
                  <div className="col-span-1">DD</div>
                  <div className="col-span-1">YYYY</div></>)}
              </div>
            </div>
            <div className="col-span-3 pr-2 border-r border-black">
              <p>Name of Investigator/s: {diph?.investigator}</p>
            </div>
            <div className="col-span-2 pr-2 border-r border-black">
              <p>Contact No: {diph?.investigator_no}</p>
            </div>
          </div>
        </div>

        <div className="border-r border-l border-black">
          <h3 className="font-bold bg-gray-100 p-1 border-b border-black">B. BACKGROUND INFORMATION</h3>
          <div className="text-[9pt] border-b border-black">
            <p>Diphtheria-containing vaccine doses: {diph?.diphtheria_dose === 'Y' ? '☑' : '☐'} Yes &nbsp;&nbsp; {diph?.diphtheria_dose === 'N' ? '☑' : '☐'} No</p>
            <p>If Yes, Number of total doses: {diph?.total_dose === 0 ? '☑' : '☐'} Zero &nbsp;&nbsp; {diph?.total_dose === 1 ? '☑' : '☐'} 1 &nbsp;&nbsp; {diph?.total_dose === 2 ? '☑' : '☐'} 2 &nbsp;&nbsp; {diph?.total_dose === 3 ? '☑' : '☐'} 3 &nbsp;&nbsp; {diph?.total_dose === 4 ? '☑' : '☐'} Unknown</p>
            <p>Date of last vaccination (MM/DD/YYYY) </p>
            <p>Source of information {diph?.sourceinformation === '1' ? '☑' : '☐'} Card &nbsp;&nbsp; {diph?.sourceinformation === '2' ? '☑' : '☐'} Recall &nbsp;&nbsp; {diph?.sourceinformation === '3' ? '☑' : '☐'} TCL</p>
            <p>Known Exposure to &nbsp;&nbsp; {diph?.known_exposure === '1' ? '☑' : '☐'} Confirmed Case &nbsp;&nbsp; {diph?.known_exposure === '2' ? '☑' : '☐'} Probable Case &nbsp;&nbsp; {diph?.known_exposure === '3' ? '☑' : '☐'} Carrier &nbsp;&nbsp; {diph?.known_exposure === '4' ? '☑' : '☐'} International traveller</p>
            <p>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; Other means of exposure: {diph?.exposure_other !== null || diph?.exposure_other !== "" ? <u>{diph?.exposure_other}</u> : '________________________________'} </p>
            <p>School name, if applicable: <u>{diph?.name_school}</u></p>
            <p>Any travel within 14 days before onset of illness &nbsp;&nbsp; {diph?.travel14days === 'Y' ? '☑' : '☐'} Yes &nbsp;&nbsp; {diph?.travel14days === 'N' ? '☑' : '☐'} No &nbsp;&nbsp; if yes where (in detail) {diph?.travel14days === 'Y' ? <u>{diph?.travel_detail}</u> : '_________________________________'}
              ____________________________________________________________________________________________________
              _______________________________________________________________________________________________________.</p>
          </div>
        </div>

        <div className="border-r border-l border-black">
          <h3 className="font-bold bg-gray-100 p-1 border-b border-black">C. CLINICAL DETAILS</h3>
          <div className="text-[9pt] border-b border-black">
            <p>Date onset of fever and/or sore throat: {diph?.date_onset !== null || diph?.date_onset !== "" ? new Date(diph?.date_onset).toLocaleDateString('en-US') : '(MM/DD/YYYY)'}</p>
            <p>Check Signs/Symptoms which apply: </p>
            <div className="grid grid-cols-4">
              <p className="col-span-1">{diph?.fever === 'Y' ? '☑' : '☐'} Fever</p>
              <p className="col-span-1">{diph?.sorethroat === 'Y' ? '☑' : '☐'} Sore Throat</p>
              <p className="col-span-1">{diph?.swallowing === 'Y' ? '☑' : '☐'} Difficulty of Swallowing</p>
              <p className="col-span-1">{diph?.breathing === 'Y' ? '☑' : '☐'} Difficulty of Breathing</p>
            </div>

            <div className="grid grid-cols-4">
              <p className="col-span-1">{diph?.cough === 'Y' ? '☑' : '☐'} Cough</p>
              <p className="col-span-1">{diph?.pseudomembrane === 'Y' ? '☑' : '☐'} Pseudomembrane</p>
              <p className="col-span-2">{diph?.other_symptoms === 'Y' ? '☑' : '☐'} Others, specify {diph?.other_symptoms_specify ? <u>{diph?.other_symptoms_specify}</u> : '_______________________________'}</p>
            </div>

            <div className="grid grid-cols-6">
              <p className="col-span-2">Outcome at discharge</p>
              <p className="col-span-1">☐ Clinically well</p>
              <p className="col-span-3">{diph?.outcome === 2 ? '☑' + `Death (Date died)(mm/dd/yyyy) ${<u>{new Date(diph.datedied).toLocaleDateString('en-US')}</u>}` : '☐' + 'Death (Date died)(mm/dd/yyyy) _______________'} </p>
            </div>

            <div className="grid grid-cols-6">
              <p className="col-span-2"></p>
              <p className="col-span-4">☐ Referred to ______________</p>
            </div>

            <div className="border-t border-black">
              <p className="mt-4">☐ Others, specify _____________</p>
            </div>
          </div>
        </div>

        {/* <div className="mt-6">
          <h3 className="font-bold">II. BACKGROUND INFORMATION</h3>
          <p><strong>Vaccinated:</strong> {diph?.vaccine_received}</p>
          <p><strong>Number of doses:</strong> {diph?.vaccine_doses}</p>
          <p><strong>Date of last vaccination:</strong> {diph?.last_vaccine_date}</p>
          <p><strong>Source of info:</strong> {diph?.vaccine_source}</p>
          <p><strong>Known exposure to:</strong> {diph?.exposure_type}</p>
          <p><strong>Other means of exposure:</strong> {diph?.exposure_other}</p>
          <p><strong>School name:</strong> {diph?.school_name}</p>
          <p><strong>Recent travel (14 days):</strong> {diph?.recent_travel}</p>
          <p><strong>Where:</strong> {diph?.travel_location}</p>
        </div> */}

        {/* <div className="mt-6">
          <h3 className="font-bold">III. CLINICAL DETAILS</h3>
          <p><strong>Date of onset:</strong> {diph?.onset_date}</p>
          <p><strong>Signs/Symptoms:</strong> {diph?.symptoms?.join(', ')}</p>
          <p><strong>Outcome at discharge:</strong> {diph?.outcome}</p>
          <p><strong>If death, date:</strong> {diph?.date_died}</p>
          <p><strong>Referred to:</strong> {diph?.referred_to}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-bold">IV. TREATMENT INFORMATION</h3>
          <p><strong>Antibiotic therapy:</strong> {diph?.antibiotic_therapy}</p>
          <p><strong>Date given:</strong> {diph?.antibiotic_date}</p>
          <p><strong>DAT given:</strong> {diph?.dat_administered}</p>
          <p><strong>Date given:</strong> {diph?.dat_date}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-bold">V. SPECIMEN COLLECTION</h3>
          <p><strong>Date of collection:</strong> {diph?.specimen_collection_date}</p>
          <p><strong>Date sent:</strong> {diph?.specimen_sent_date}</p>
          <p><strong>Date of results:</strong> {diph?.result_date}</p>
          <p><strong>Result:</strong> {diph?.lab_result}</p>
          <p><strong>If positive:</strong> {diph?.toxigenic_status}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-bold">VI. FINAL CLASSIFICATION</h3>
          <p><strong>Classification:</strong> {diph?.final_classification}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-bold">VII. INVESTIGATION DETAILS</h3>
          <p><strong>Date of Investigation:</strong> {diph?.investigation_date}</p>
          <p><strong>Name of investigator:</strong> {diph?.investigator_name}</p>
          <p><strong>Contact No.:</strong> {diph?.investigator_contact}</p>
        </div> */}

        <div className="mt-6 text-sm italic text-gray-700">
          <p>Deliberately providing false or misleading information may constitute non-cooperation under RA No. 11332.</p>
        </div>
      </div>
    </div>
  );
};

export default PrintCIF;
