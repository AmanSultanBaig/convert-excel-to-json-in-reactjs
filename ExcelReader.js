import XLSX from "xlsx"
import { make_cols } from "./MakeColumns"

const [excelData, setExcelData] = useState([])
const [col, setCol] = useState([])
const [file, setFile] = useState(null)

// upload excel file and set into state
  const handleChange = e => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
      setFile(files[0])
    }
  }

  // convert excel into json
  const handleFile = (uploadedFile) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString

    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      })
      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws)
      /* Update state */
      setExcelData(data)
      setCol(make_cols(ws["!ref"]))
      // this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
      //   console.log(JSON.stringify(this.state.data, null, 2))
      // })
    }
