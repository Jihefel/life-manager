/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, Box } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarrefourDatas } from "../redux/features/products/carrefourSlice";
import { DataGrid } from "@mui/x-data-grid";

function Price() {
  const [datasDelhaize, setDatasDelhaize] = useState(null);
  const [datasColruyt, setDatasColruyt] = useState({
    nom: "",
    prix: null,
    image: "",
  });
  const [datasAldi, setDatasAldi] = useState([]);
  const dispatch = useDispatch();
  const datasCarrefour = useSelector((state) => state.dataCarrefour.datas);

  const barCode = "F2019122700049010000";

  const delhaizeUrl = `/api/delhaize/?operationName=ProductDetails&variables=%7B%22anonymousCartCookie%22%3A%22NzcxMTAzNDktZTg0ZC00MWFjLTlmZjQtZTQwZDY4MTMxMjlh%22%2C%22productCode%22%3A%22${barCode}%22%2C%22lang%22%3A%22fr%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2251e32fe4a1718ffe68f784090031600c540d69f06a0b48b4e8ff8ea411da5074%22%7D%7D`;

  // Requête vers l'API Carrefour
  const carrefourUrl = "/api/carrefour/basket/getBasketV2?storeRef=0669&slotRef=0002APLJ";

  const codebar = "3074457345616774785";

  const colruytUrl = `/api/collectandgo?storeId=90004&errorViewName=ProductDisplayErrorView&urlLangId=-2&productId=${codebar}&langId=-2&catalogId=10683&headlessPDP=true&list=true`;

  const aldiUrl = `https://w297xvtvrz-2.algolianet.com/1/indexes/*/objects?x-algolia-agent=Algolia%20for%20JavaScript%20(4.14.2)%3B%20Browser`;

  const fetchData = async (url, signa, tk) => {
    try {
      if (url === aldiUrl) {
        const configAldi = {
          headers: {
            "x-algolia-api-key": "99e7319be09a35fa4abab1f241d44054",
            "x-algolia-application-id": "W297XVTVRZ",
          },
        };
        const indexName = "prod_be_fr_assortment"; // Remplacez par le nom d'index souhaité
        const requestData = {
          requests: [
            { indexName: indexName, objectID: "2128-1-0" },
            { indexName: indexName, objectID: "8272-1-0" },
            { indexName: indexName, objectID: "1216-1-0" },
          ],
        };

        const modifiedUrl = aldiUrl.replace("*", indexName);

        requestData.requests.forEach((request) => {
          const modifiedRequestUrl = modifiedUrl.replace("objects", request.objectID);

          axios
            .get(modifiedRequestUrl, configAldi)
            .then((response) => {
              // Vérifier si response.data est déjà présent dans datasAldi
              const isDuplicate = datasAldi.some((item) => item.objectID === response.data.objectID);
              if (!isDuplicate) {
                // Ajouter response.data à datasAldi uniquement s'il n'est pas déjà présent
                if (datasAldi.length <= 3) {
                  setDatasAldi((prevDatasAldi) => [...prevDatasAldi, response.data]);
                }
              }
            })
            .catch((error) => {
              // Gestion des erreurs
              console.error(error);
            });
        });
      } else {
        const config = {
          headers: {
            "x-api-key": "cow2K8k0Jl7OFJ9kXRhhNU0XHCqbza6a",
            "x-signature": signa,
            "X-User-Token": tk,
            "Choice-Carrefour-Language": "fr",
          },
        };
        const response = await axios.get(url, config);
        const data = response.data;

        switch (url) {
          case delhaizeUrl:
            setDatasDelhaize(data);
            break;
          case carrefourUrl:
            dispatch(getCarrefourDatas(data));
            break;
          case colruytUrl:
            getDataFromHtmlColruyt(data);
            break;
          default:
            console.log(data);
            break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDataFromHtmlColruyt = (data) => {
    // Analyse le contenu HTML rendu et extrait les variables utiles
    const regexNom = /extra_utag_data.product_name = \["(.+)"\]/;
    const regexPrix = /extra_utag_data.product_unitprice = \['([\d.]+)'\]/;
    const regexImg = /"ItemThumbnailImage" : "([^"]+)"/;
    const matchNom = data.match(regexNom);
    const matchPrix = data.match(regexPrix);
    const matchImg = data.match(regexImg);
    if (matchNom) {
      const productName = matchNom[1];
      setDatasColruyt((prevState) => ({ ...prevState, nom: productName }));
    } else {
      console.log("Variable Name not found in the HTML content.");
    }
    if (matchPrix) {
      const productUnitPrice = matchPrix[1];
      setDatasColruyt((prevState) => ({ ...prevState, prix: parseFloat(productUnitPrice) }));
    } else {
      console.log("Variable Price not found in the HTML content.");
    }
    if (matchImg) {
      const productImageThumbnail = matchImg[1];
      setDatasColruyt((prevState) => ({ ...prevState, image: productImageThumbnail }));
    } else {
      console.log("Variable Image not found in the HTML content.");
    }
  };

  useEffect(() => {
    fetchData(delhaizeUrl);
    fetchData(colruytUrl);
    fetchData(aldiUrl);
  }, []);

  const signa = useRef();
  const tk = useRef();
  const submitHeader = (e) => {
    e.preventDefault();
    fetchData(carrefourUrl, signa.current.value, tk.current.value);
    signa.current.value = "";
    tk.current.value = "";
  };

  const columns = [
    { field: "article", headerName: "Article", flex: 0.5, minWidth: 350 },
    {
      field: "nomCarrefour",
      headerName: "Nom ",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "prixCarrefour",
      headerName: "Prix",
      width: 130,
      valueFormatter: ({ value }) => `${value} €`,
    },
    {
      field: "nomDelhaize",
      headerName: "Nom ",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "prixDelhaize",
      headerName: "Prix",
      width: 130,
      valueFormatter: ({ value }) => `${value} €`,
    },
    {
      field: "nomColruyt",
      headerName: "Nom ",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "prixColruyt",
      headerName: "Prix",
      width: 130,
      valueFormatter: ({ value }) => `${value} €`,
    },
    {
      field: "nomAldi",
      headerName: "Nom ",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "prixAldi",
      headerName: "Prix",
      width: 130,
      valueFormatter: ({ value }) => `${value} €`,
    },
  ];

  const columnGroupingModel = [
    {
      groupId: "Magasins",
      children: [
        {
          groupId: "Carrefour",
          children: [{ field: "nomCarrefour" }, { field: "prixCarrefour" }],
        },
        {
          groupId: "Delhaize",
          children: [{ field: "nomDelhaize" }, { field: "prixDelhaize" }],
        },
        {
          groupId: "Colruyt",
          children: [{ field: "nomColruyt" }, { field: "prixColruyt" }],
        },
        {
          groupId: "Aldi",
          children: [{ field: "nomAldi" }, { field: "prixAldi" }],
        },
      ],
    },
  ];

  const rows = datasCarrefour?.basket.items.map((item, index) => ({
    id: parseInt(index) + 1,
    article: item.productSimpleView.shortDesc,
    nomDelhaize: `${datasDelhaize?.data.productDetails.manufacturerName} ${datasDelhaize?.data.productDetails.name} ${datasDelhaize?.data.productDetails.price.supplementaryPriceLabel2}`,
    prixDelhaize: parseFloat(datasDelhaize?.data.productDetails.price.unitPrice * 2),
    nomCarrefour: item?.productSimpleView.shortDesc,
    prixCarrefour: parseFloat(item?.itemTotalAmount.toString().slice(0, -2) + "." + item?.itemTotalAmount.toString().slice(-2)).toFixed(2),
    nomColruyt: datasColruyt?.nom,
    prixColruyt: parseFloat(datasColruyt?.prix * 2),
    nomAldi: `${datasAldi[index]?.brandName ? datasAldi[index]?.brandName : ""} ${datasAldi[index]?.productName}`,
    prixAldi: parseFloat(datasAldi[index]?.salesPrice * 2),
  }));

  const sortPrices = (params) => {
    if (!["prixDelhaize", "prixCarrefour", "prixColruyt", "prixAldi"].includes(params.field)) {
      return "";
    }
    const prixCarrefour = parseFloat(params.row.prixCarrefour);
    const prixDelhaize = parseFloat(params.row.prixDelhaize);
    const prixColruyt = parseFloat(params.row.prixColruyt);
    const prixAldi = parseFloat(params.row.prixAldi);
    if (isNaN(prixCarrefour) || isNaN(prixDelhaize) || isNaN(prixColruyt) || isNaN(prixAldi)) {
      return "";
    }
    const prices = {
      prixDelhaize,
      prixCarrefour,
      prixColruyt,
      prixAldi,
    };

    const sortedFields = Object.keys(prices).sort((a, b) => prices[b] - prices[a]);

    if (prices[sortedFields[0]] === prices[sortedFields[1]] && prices[sortedFields[0]] === prices[sortedFields[2]] && prices[sortedFields[0]] === prices[sortedFields[3]]) {
      return "equal";
    } else {
      const highestFields = [sortedFields[0], sortedFields[1], sortedFields[2]]; // Les trois champs les plus élevés
      const lowestField = sortedFields[sortedFields.length - 1]; // Le champ le plus bas

      if (prices[params.field] === prices[highestFields[0]] && prices[params.field] === prices[highestFields[1]]) {
        return "equal";
      } else if (highestFields.includes(params.field)) {
        return "sup";
      } else if (params.field === lowestField) {
        return "inf";
      } else {
        return "";
      }
    }
  };

  return (
    <>
      <div className=''>
        <fieldset>
          <form onSubmit={submitHeader}>
            <div className='signature'>
              <label htmlFor='signa'>Signature</label>
              <input
                type='text'
                id='signa'
                ref={signa}
              />
            </div>
            <div className='token'>
              <label htmlFor='tk'>User Token</label>
              <input
                type='text'
                id='tk'
                ref={tk}
              />
            </div>
            <button type='submit'>Modifier header</button>
          </form>
        </fieldset>

        {datasCarrefour ? (
          <Box
            sx={{
              "& .inf": {
                backgroundColor: "#81c784",
                color: "black",
              },
              "& .sup": {
                backgroundColor: "#e57373",
                color: "black",
              },
              "& .equal": {
                backgroundColor: "#ffb74d",
                color: "black",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              experimentalFeatures={{ columnGrouping: true }}
              columnGroupingModel={columnGroupingModel}
              pageSizeOptions={[10, 20, 38]}
              checkboxSelection
              density='comfortable'
              autoHeight
              getCellClassName={sortPrices}
            />
          </Box>
        ) : null}

        <div className='prix'>
          {datasAldi ? datasAldi?.map((produit, index) => <h1 key={index}>{`${produit.brandName ? produit.brandName : ""} ${produit.productName}`}</h1>) : null}
          {datasDelhaize ? (
            <>
              <h1>{`${datasDelhaize.data.productDetails.manufacturerName} ${datasDelhaize.data.productDetails.name}`}</h1>
              <img
                src={`https://www.delhaize.be/${datasDelhaize?.data.productDetails.images[0].url}`}
                alt={datasDelhaize?.data.productDetails.images[0].altText}
                style={{ maxWidth: "10%" }}
              />
              <p>{datasDelhaize?.data.productDetails.price.unitPrice}</p>
            </>
          ) : (
            <>
              <CircularProgress />
              <br />
            </>
          )}
          {datasCarrefour ? (
            datasCarrefour?.basket.items.map((item, index) => (
              <Fragment key={index}>
                <h1>{item?.productSimpleView.shortDesc}</h1>
                <img
                  src={item?.productSimpleView.mmContents[1].uri}
                  alt=''
                />
                <p>{parseFloat(item?.itemTotalAmount.toString().slice(0, -2) + "." + item?.itemTotalAmount.toString().slice(-2)).toFixed(2)}</p>
                <br />
              </Fragment>
            ))
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </>
  );
}

export default Price;
