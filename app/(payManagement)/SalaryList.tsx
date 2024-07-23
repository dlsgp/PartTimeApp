import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { DataTable, Provider } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

const SalaryList = () => {
  const data = [
    {
      num: 1,
      staffNum: "100401",
      name: "김리리",
      class: "알바",
      hourWage: "10000",
      insurance: "O",
      bonus: "100,000",
      etc: "-50,000",
      workTime: "25시간",
      sum: "780,000",
    },
    {
      num: 2,
      staffNum: "100402",
      name: "박미리",
      class: "알바",
      hourWage: "10000",
      insurance: "O",
      bonus: "130,000",
      etc: "-50,000",
      workTime: "35시간",
      sum: "980,000",
    },
    {
      num: 3,
      staffNum: "100403",
      name: "이진리",
      class: "알바",
      hourWage: "10000",
      insurance: "O",
      bonus: "100,000",
      etc: "-50,000",
      workTime: "25시간",
      sum: "780,000",
    },
    {
      num: 4,
      staffNum: "100404",
      name: "나시리",
      class: "알바",
      hourWage: "10000",
      insurance: "O",
      bonus: "150,000",
      etc: "-50,000",
      workTime: "30시간",
      sum: "880,000",
    },
    {
      num: 5,
      staffNum: "100405",
      name: "주피리",
      class: "알바",
      hourWage: "10000",
      insurance: "O",
      bonus: "60,000",
      etc: "-50,000",
      workTime: "20시간",
      sum: "730,000",
    },
  ];

  const { width } = Dimensions.get("window");

  const [selectedDate, setSelectedDate] = useState<string>("2024-07");
  const [selectedWorkTimes, setSelectedWorkTimes] = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedDate(value)}
            items={[
              { label: "2024-05", value: "2024-05" },
              { label: "2024-06", value: "2024-06" },
              { label: "2024-07", value: "2024-07" },
              { label: "2024-08", value: "2024-08" },
              { label: "2024-09", value: "2024-09" },
              { label: "2024-10", value: "2024-10" },
            ]}
            value={selectedDate}
            style={pickerSelectStyles}
          />
          <Icon
            name="settings"
            type="feather"
            size={24}
            style={styles.settingsIcon}
          />
        </View>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>번호</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>사원 번호</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>이름</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>직급</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>시급</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>4대보험유무</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>주휴수당</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>기타</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              <TouchableOpacity onPress={togglePicker}>
                <Text style={styles.headerText}>근무시간</Text>
              </TouchableOpacity>
              {showPicker && (
                <View style={styles.pickerContainer}>
                  <RNPickerSelect
                    onValueChange={(value) => setSelectedWorkTimes(value)}
                    items={WorkTimes}
                    value={selectedWorkTimes}
                    style={pickerSelectStyles}
                    placeholder={{}}
                  />
                </View>
              )}
            </DataTable.Title>
            <DataTable.Title style={styles.headerCell}>
              <Text style={styles.headerText}>전체급여</Text>
            </DataTable.Title>
          </DataTable.Header>
          {paginatedData.map((row) => (
            <DataTable.Row key={row.num}>
              <DataTable.Cell style={styles.cell}>{row.num}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {row.staffNum}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{row.name}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{row.class}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {row.hourWage}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {row.insurance}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{row.bonus}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{row.etc}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {row.workTime}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{row.sum}</DataTable.Cell>
            </DataTable.Row>
          ))}
          <View style={styles.pagination}>
            <TouchableOpacity
              disabled={page === 0}
              onPress={() => setPage(page - 1)}
            >
              <Text style={styles.paginationText}>{'<'}</Text>
            </TouchableOpacity>
            {[...Array(totalPages)].map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setPage(i)}>
                <Text
                  style={[
                    styles.paginationText,
                    page === i && styles.activePage,
                  ]}
                >
                  {i + 1}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              disabled={page === totalPages - 1}
              onPress={() => setPage(page + 1)}
            >
              <Text style={styles.paginationText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </DataTable>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: "#2c2c54",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerCell: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  settingsIcon: {
    marginRight: 10,
  },
  pickerContainer: {
    marginTop: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  paginationText: {
    marginHorizontal: 5,
    fontSize: 16,
  },
  activePage: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default SalaryList;
