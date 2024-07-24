import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

const EmployeeList = () => {
  const data = [
    {
      num: 6,
      staffNum: "0006",
      name: "박미리",
      class: "알바",
      joinDate: "24.07.10",
    },
    {
      num: 5,
      staffNum: "0005",
      name: "나시리",
      class: "알바",
      joinDate: "24.07.10",
    },
    {
      num: 4,
      staffNum: "0004",
      name: "주피리",
      class: "알바",
      joinDate: "24.07.10",
    },
    {
      num: 3,
      staffNum: "0003",
      name: "이진리",
      class: "알바",
      joinDate: "24.07.10",
    },
    {
      num: 2,
      staffNum: "0002",
      name: "김리리",
      class: "알바",
      joinDate: "24.07.10",
    },
    {
      num: 1,
      staffNum: "0001",
      name: "홍길동",
      class: "알바",
      joinDate: "24.07.10",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {data.map((row) => (
        <View key={row.num} style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardText}>번호: {row.num}</Text>
          </View>
          <Text style={styles.cardText}>사원 번호: {row.staffNum}</Text>
          <Text style={styles.cardText}>이름: {row.name}</Text>
          <Text style={styles.cardText}>직급: {row.class}</Text>
          <View style={styles.iconRow}>
            <Text style={styles.cardText}>입사일: {row.joinDate}</Text>
            <View style={styles.cardIcon}>
              <FontAwesome name="pencil" size={14} color="#000" />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  // <Provider>
  //   //   <View style={styles.container}>
  //   //     <View style={styles.headerRow}>
  //   //       <View style={styles.pickerContainer}>
  //   //         <RNPickerSelect
  //   //           onValueChange={(value) => handleSort(value)}
  //   //           items={[
  //   //             { label: "오름차순", value: "asc" },
  //   //             { label: "내림차순", value: "desc" },
  //   //           ]}
  //   //           value={selectedOrder}
  //   //           style={pickerSelectStyles}
  //   //           placeholder={{}}
  //   //         />
  //   //       </View>
  //   //       <View style={styles.searchContainer}>
  //   //         <TextInput
  //   //           style={styles.searchBar}
  //   //           placeholder="검색"
  //   //           value={searchQuery}
  //   //           onChangeText={(text) => setSearchQuery(text)}
  //   //         />
  //   //       </View>
  //   //     </View>
  //   //     <DataTable>
  //   //       <DataTable.Header style={styles.header}>
  //   //         <DataTable.Title style={styles.headerCell}>
  //   //           <CheckBox containerStyle={styles.checkboxContainer} />
  //   //         </DataTable.Title>
  //   //         <DataTable.Title style={styles.headerCell}>
  //   //           <Text style={styles.headerText}>번호</Text>
  //   //         </DataTable.Title>
  //   //         <DataTable.Title style={styles.headerCell}>
  //   //           <Text style={styles.headerText}>사원 번호</Text>
  //   //         </DataTable.Title>
  //   //         <DataTable.Title style={styles.headerCell}>
  //   //           <Text style={styles.headerText}>이름</Text>
  //   //         </DataTable.Title>
  //   //         <DataTable.Title style={styles.headerCell}>
  //   //           <Text style={styles.headerText}>직급</Text>
  //   //         </DataTable.Title>
  //   //         <DataTable.Title style={styles.headerCell}>
  //   //           <Text style={styles.headerText}>입사일</Text>
  //   //         </DataTable.Title>
  //   //         <DataTable.Title style={styles.headerCell}> </DataTable.Title>
  //   //       </DataTable.Header>
  //   //       {paginatedData.map((row) => (
  //   //         <DataTable.Row key={row.num}>
  //   //           <DataTable.Cell style={styles.cell}>
  //   //             <CheckBox containerStyle={styles.checkboxContainer} />
  //   //           </DataTable.Cell>
  //   //           <DataTable.Cell style={styles.cell}>{row.num}</DataTable.Cell>
  //   //           <DataTable.Cell style={styles.cell}>
  //   //             {row.staffNum}
  //   //           </DataTable.Cell>
  //   //           <DataTable.Cell style={styles.cell}>{row.name}</DataTable.Cell>
  //   //           <DataTable.Cell style={styles.cell}>{row.class}</DataTable.Cell>
  //   //           <DataTable.Cell style={styles.cell}>
  //   //             {row.joinDate}
  //   //           </DataTable.Cell>
  //   //           <DataTable.Cell style={styles.cell}>
  //   //             <Icon name="edit" size={20} />
  //   //           </DataTable.Cell>
  //   //         </DataTable.Row>
  //   //       ))}
  //   //       <View style={styles.pagination}>
  //   //         <TouchableOpacity
  //   //           disabled={page === 0}
  //   //           onPress={() => setPage(page - 1)}
  //   //         >
  //   //           <Text style={styles.paginationText}>{"<"}</Text>
  //   //         </TouchableOpacity>
  //   //         {[...Array(totalPages)].map((_, i) => (
  //   //           <TouchableOpacity key={i} onPress={() => setPage(i)}>
  //   //             <Text
  //   //               style={[
  //   //                 styles.paginationText,
  //   //                 page === i && styles.activePage,
  //   //               ]}
  //   //             >
  //   //               {i + 1}
  //   //             </Text>
  //   //           </TouchableOpacity>
  //   //         ))}
  //   //         <TouchableOpacity
  //   //           disabled={page === totalPages - 1}
  //   //           onPress={() => setPage(page + 1)}
  //   //         >
  //   //           <Text style={styles.paginationText}>{">"}</Text>
  //   //         </TouchableOpacity>
  //   //       </View>
  //   //     </DataTable>
  //   //   </View>
  // </Provider>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: "14%",
  },

  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  cardIcon: {
    marginLeft: "auto",
  },
});

export default EmployeeList;
