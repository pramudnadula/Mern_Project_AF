import React, { useEffect, useState, useRef } from "react";
import { GET } from "../../Helper/httpHelper";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

function ViewAllEvaluateResult(props) {
  const [markingMarkingScheme, setMarkingMarkingScheme] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const data = [];

  {
    markingMarkingScheme &&
      markingMarkingScheme?.map((element, index) => {
        let arr = {
          key: index,
          groupId: element.groupId.groupName,
          marker: element.marker,
          markingSchemeId: element.markingSchemeId.submissionType,
        };
        data.push(arr);
      });
  }

  useEffect(() => {
    GET(`api/evoluate/views/`)
      .then((res) => {
        console.log(res);
        setMarkingMarkingScheme(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Group Name",
      dataIndex: "groupId",
      key: "groupId",
      width: "30%",
      ...getColumnSearchProps("groupId"),
    },
    {
      title: "Marker",
      dataIndex: "marker",
      key: "marker",
      width: "20%",
      ...getColumnSearchProps("marker"),
    },
    {
      title: "Submission Type",
      dataIndex: "markingSchemeId",
      key: "markingSchemeId",
      ...getColumnSearchProps("markingSchemeId"),
    },
  ];

  return (
    <div className="container">
      <br />
      <h1 class="text-center">View All Results</h1>
      <br />
      <div className="row justify-content-center">
        <div className="col-8">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>

    </div>
  )
}

export default ViewAllEvaluateResult;