import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './Logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import lab_icon from './lab_icon.svg'
import scan_icon from './scan_icon.svg'
import consultation_icon from './consultation_icon.svg'
import download_icon from './download_icon.svg'
import share_icon from './share_icon.svg'
import empty_folder_icon from './empty_folder_icon.svg'
import up_arrow from './up_arrow.svg'
import down_arrow from './down_arrow.svg'
import view_icon from './view_icon.svg'
import clock_icon from './clock_icon.svg'
import shield_icon from './shield_icon.svg'
import calendar_icon from './calendar_icon.svg'
import video_call_icon from './video_call_icon.svg'
import prescription_icon from './prescription_icon.svg'
import health_record_icon from './health_record_icon.svg'
import reminder_icon from './reminder_icon.svg'
import pdf_icon from './pdf_icon.png'

import attachment_icon from './attachment_icon.svg'
import send_icon from './send_icon.svg'
import loading_icon from './loading_icon.svg'
import file_icon from './file_icon.svg'
import quick_action_icon from './quick_action_icon.svg'

import fever_icon from './fever_icon.png'
import headache_icon from './headache_icon.png'
import allergy_icon from './allergy_icon.png'
import stomach_icon from './stomach_icon.png'
import dizziness_icon from './dizziness_icon.png'
import image_icon from './image_icon.svg'
import cough_icon from './cough_icon.png'
import ai_doctor_icon from './ai_doctor_icon.png'
export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    lab_icon,
    scan_icon,
    consultation_icon,
    download_icon,
    share_icon,
    empty_folder_icon,
    up_arrow,
    down_arrow,
    view_icon,
    clock_icon,
    shield_icon,
    calendar_icon,
    video_call_icon,
    prescription_icon,
    health_record_icon,
    reminder_icon,
    pdf_icon,
    attachment_icon,
    send_icon,
    loading_icon,
    file_icon,
    quick_action_icon,
    // Newly added icons
    fever_icon,
    headache_icon,
    allergy_icon,
    stomach_icon,
    dizziness_icon,
    image_icon,
    ai_doctor_icon,
    cough_icon
}


// Перевод специальностей
export const specialityData = [
    {
        speciality: 'Терапевт',           // General physician
        image: General_physician
    },
    {
        speciality: 'Гинеколог',         // Gynecologist
        image: Gynecologist
    },
    {
        speciality: 'Дерматолог',        // Dermatologist
        image: Dermatologist
    },
    {
        speciality: 'Педиатры',          // Pediatricians
        image: Pediatricians
    },
    {
        speciality: 'Невролог',          // Neurologist
        image: Neurologist
    },
    {
        speciality: 'Гастроэнтеролог',   // Gastroenterologist
        image: Gastroenterologist
    },
]

// Полностью переведённый список врачей
export const doctors = [
    {
        _id: 'doc1',
        name: 'Доктор Ричард Джеймс',
        image: doc1,
        speciality: 'Терапевт',
        degree: 'Степень MBBS',
        experience: '4 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 50,
        address: {
            line1: '17-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc2',
        name: 'Доктор Эмили Ларсон',
        image: doc2,
        speciality: 'Гинеколог',
        degree: 'Степень MBBS',
        experience: '3 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 60,
        address: {
            line1: '27-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc3',
        name: 'Доктор Сара Патель',
        image: doc3,
        speciality: 'Дерматолог',
        degree: 'Степень MBBS',
        experience: '1 год опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 30,
        address: {
            line1: '37-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc4',
        name: 'Доктор Кристофер Ли',
        image: doc4,
        speciality: 'Педиатры',
        degree: 'Степень MBBS',
        experience: '2 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 40,
        address: {
            line1: '47-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc5',
        name: 'Доктор Дженнифер Гарсия',
        image: doc5,
        speciality: 'Невролог',
        degree: 'Степень MBBS',
        experience: '4 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 50,
        address: {
            line1: '57-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc6',
        name: 'Доктор Эндрю Уильямс',
        image: doc6,
        speciality: 'Невролог',
        degree: 'Степень MBBS',
        experience: '4 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 50,
        address: {
            line1: '57-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc7',
        name: 'Доктор Кристофер Дэвис',
        image: doc7,
        speciality: 'Терапевт',
        degree: 'Степень MBBS',
        experience: '4 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 50,
        address: {
            line1: '17-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc8',
        name: 'Доктор Тимоти Уайт',
        image: doc8,
        speciality: 'Гинеколог',
        degree: 'Степень MBBS',
        experience: '3 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 60,
        address: {
            line1: '27-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc9',
        name: 'Доктор Ава Митчелл',
        image: doc9,
        speciality: 'Дерматолог',
        degree: 'Степень MBBS',
        experience: '1 год опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 30,
        address: {
            line1: '37-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc10',
        name: 'Доктор Джеффри Кинг',
        image: doc10,
        speciality: 'Педиатры',
        degree: 'Степень MBBS',
        experience: '2 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 40,
        address: {
            line1: '47-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc11',
        name: 'Доктор Зои Келли',
        image: doc11,
        speciality: 'Невролог',
        degree: 'Степень MBBS',
        experience: '4 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 50,
        address: {
            line1: '57-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc12',
        name: 'Доктор Патрик Харрис',
        image: doc12,
        speciality: 'Невролог',
        degree: 'Степень MBBS',
        experience: '4 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 50,
        address: {
            line1: '57-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc13',
        name: 'Доктор Хлоя Эванс',
        image: doc13,
        speciality: 'Терапевт',
        degree: 'Степень MBBS',
        experience: '4 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 50,
        address: {
            line1: '17-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc14',
        name: 'Доктор Райан Мартинес',
        image: doc14,
        speciality: 'Гинеколог',
        degree: 'Степень MBBS',
        experience: '3 года опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 60,
        address: {
            line1: '27-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
    {
        _id: 'doc15',
        name: 'Доктор Амелия Хилл',
        image: doc15,
        speciality: 'Дерматолог',
        degree: 'Степень MBBS',
        experience: '1 год опыта',
        about: 'Доктор Дэвис уделяет особое внимание всесторонней медицинской помощи, делая упор на профилактику, раннюю диагностику и эффективные методы лечения. Он придерживается принципов комплексного подхода к здоровью и заботится о результативном лечении пациентов.',
        fees: 30,
        address: {
            line1: '37-я улица, Ричмонд',
            line2: 'Кольцевая дорога, Лондон'
        }
    },
]
